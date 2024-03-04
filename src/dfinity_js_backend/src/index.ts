import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import {
    Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal
} from "azle/canisters/ledger";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

/**
 * This type represents a product that can be listed on a marketplace.
 * It contains basic properties that are needed to define a product.
 */
const Client = Record({
    id: text,
    name: text,
    email: text,
    phone: text,
    address: text 
});


const Service = Record({
    id: text,
    name: text,
    description: text,
    duration: nat64,
    price: nat64
})

const Appointment = Record({
    id: text,
    client_id: text,
    service_id: text,
    date: text,
    time: text,
    status: text,
})


const ClientPayload = Record({
    name: text,
    email: text,
    phone: text,
    address: text
});

const ServicePayload = Record({
    name: text,
    description: text,
    duration: nat64,
    price: nat64
});



const AppointmentPayload = Record({
    client_id: text,
    service_id: text,
    date: text,
    time: text,
    status: text,
});




const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text
});


const clientsStorage = StableBTreeMap(0, text, Client);
const serviceStorage = StableBTreeMap(1, text, Service)
const appointmentStorage = StableBTreeMap(2, text, Appointment)




export default Canister({
    
    // Queries to retrieve entities
    getClients: query([], Vec(Client), () => clientsStorage.values()),
    getServices: query([], Vec(Service), () => serviceStorage.values()),
    getAppointments: query([], Vec(Appointment), () => appointmentStorage.values()),

    // Queries to retrieve specific entities by ID
    getClient: query([text], Result(Client, Message), (id) => Result.fromOption(clientsStorage.get(id), { error: `Client with id=${id} not found` })),
    getService: query([text], Result(Service, Message), (id) => Result.fromOption(serviceStorage.get(id), { error: `Service with id=${id} not found` })),
    getAppointment: query([text], Result(Appointment, Message), (id) => Result.fromOption(appointmentStorage.get(id), { error: `Appointment with id=${id} not found` })),

      addClient: update([ClientPayload], Result(Client, Message), (payload) => {
        const client = { id: uuidv4(), ...payload };
        clientsStorage.insert(client.id, client);
        return client;
    }),
    addService: update([ServicePayload], Result(Service, Message), (payload) => {
        const service = { id: uuidv4(), ...payload };
        serviceStorage.insert(service.id, service);
        return service;
    }),
    addAppointment: update([AppointmentPayload], Result(Appointment, Message), (payload) => {
        const appointment = { id: uuidv4(), ...payload };
        appointmentStorage.insert(appointment.id, appointment);
        return appointment;
    }),
     updateClient: update([Client], Result(Client, Message), (payload) => {
        clientsStorage.insert(payload.id, payload);
        return payload;
    }),
    updateService: update([Service], Result(Service, Message), (payload) => {
        serviceStorage.insert(payload.id, payload);
        return payload;
    }),
    updateAppointment: update([Appointment], Result(Appointment, Message), (payload) => {
        appointmentStorage.insert(payload.id, payload);
        return payload;
    }),

    // delete client
    deleteClient: update([text], Result(text, Message), (id) => Result.fromOption(clientsStorage.remove(id), { error: `Cannot delete the Client: Client with id=${id} not found` })),
    // delete service
    deleteService: update([text], Result(text, Message), (id) => Result.fromOption(serviceStorage.remove(id), { error: `Cannot delete the Service: Service with id=${id} not found` })),
    // delete appointment
    deleteAppointment: update([text], Result(text, Message), (id) => Result.fromOption(appointmentStorage.remove(id), { error: `Cannot delete the Appointment: Appointment with id=${id} not found` })),
    
    // get all the appointments for a given client id
    getClientAppointments: query([text], Vec(Appointment), (clientId) => {
        return appointmentStorage.values().filter((appointment) => appointment.client_id === clientId);
    }),

    // get all the appointments for a given service id
    getServiceAppointments: query([text], Vec(Appointment), (serviceId) => {
        return appointmentStorage.values().filter((appointment) => appointment.service_id === serviceId);
    }),

    // get all the appointments by status
    getAppointmentsByStatus: query([text], Vec(Appointment), (status) => {
        return appointmentStorage.values().filter((appointment) => appointment.status.toLowerCase() === status.toLowerCase());
    }),

    // calculate the total revenue for a given service id at given date
    getServiceRevenue: query([text, text], nat64, (serviceId, date) => {
        const initialPrice = 0n;
        const appointments = appointmentStorage.values().filter((appointment) => appointment.service_id === serviceId && appointment.date === date);
        return appointments.reduce((acc, appointment) => acc + serviceStorage.get(appointment.service_id).Some.price, initialPrice);
    }),

    // change status to completed
    completeAppointment: update([text], Result(Appointment, Message), (id) => {
        const appointmentOpt = appointmentStorage.get(id);
        if ("None" in appointmentOpt) {
            return Err({ NotFound: `cannot complete the Appointment: Appointment with id=${id} not found` });
        }
        const appointment = appointmentOpt.Some;
        appointment.status = "completed";
        appointmentStorage.insert(appointment.id, appointment);
        return Ok(appointment);
    }),

    // get most popular service
    getMostPopularService: query([], Service, () => {
        const appointments = appointmentStorage.values();
        const serviceIds = appointments.map((appointment) => appointment.service_id);
        const serviceId = serviceIds.sort((a, b) =>
            serviceIds.filter((v) => v === a).length - serviceIds.filter((v) => v === b).length
        ).pop();
        return serviceStorage.get(serviceId).Some;
    }),

    // get most popular client
    getMostPopularClient: query([], Client, () => {
        const appointments = appointmentStorage.values();
        const clientIds = appointments.map((appointment) => appointment.client_id);
        const clientId = clientIds.sort((a, b) =>
            clientIds.filter((v) => v === a).length - clientIds.filter((v) => v === b).length
        ).pop();
        return clientsStorage.get(clientId).Some;
    }),

    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0);
    }),

   
});



/*
    a hash function that is used to generate correlation ids for orders.
    also, we use that in the verifyPayment function where we check if the used has actually paid the order
*/
function hash(input: any): nat64 {
    return BigInt(Math.abs(hashCode().value(input)));
};

// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};




