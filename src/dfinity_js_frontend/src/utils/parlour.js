import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createClient(client) {
  return window.canister.parlour.addClient(client);
}

export async function createService(service) {
  return window.canister.parlour.addService(service);
}

export async function createAppointment(appointment) {
  return window.canister.parlour.addAppointment(appointment);
}


export async function getClients() {
  try {
    return await window.canister.parlour.getClients();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getServices() {
  try {
    return await window.canister.parlour.getServices();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getAppointments() {
  try {
    return await window.canister.parlour.getAppointments();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getClient(clientId) {
  try {
    return await window.canister.parlour.getBook(clientId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getService(serviceId) {
  try {
    return await window.canister.parlour.getService(serviceId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getAppointment(appointmentId) {
  try {
    return await window.canister.parlour.getAppointment(appointmentId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function updateClient(client){
  return window.canister.parlour.updateClient(client);
}

export async function updateService(service){
  return window.canister.parlour.updateService(service);
}

export async function updateAppointment(appointment){
  return window.canister.parlour.updateAppointment(appointment);
}


export async function getClientAppointments(clientId) {
  try {
    return await window.canister.parlour.getClientAppointments(clientId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
export async function getAppointmentsByStatus(status) {
  try {
    return await window.canister.parlour.getAppointmentsByStatus(status);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}


export async function getServiceRevenue(serviceId, date) {
  try {
    return await window.canister.parlour.getServiceRevenue(serviceId, date);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function completeAppointment(appointmentId) {
  return window.canister.parlour.completeAppointment(appointmentId);
}

export async function getMostPopularService() {
  try {
    return await window.canister.parlour.getMostPopularService();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getMostPopularClient() {
  try {
    return await window.canister.parlour.getMostPopularClient();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}


export async function deleteClient(clientId){
  return window.canister.parlour.deleteClient(clientId);
}

export async function deleteService(serviceId){
  return window.canister.parlour.deleteService(serviceId);
}

export async function deleteAppointment(appointmentId){
  return window.canister.parlour.deleteAppointment(appointmentId);
}






