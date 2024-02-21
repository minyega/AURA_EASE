import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Cover = ({ title, login, coverImg }) => {
  if ((title, login, coverImg)) {
    return (
      <>
        <div className="d-flex justify-content-space-between align-items-center p-3 " 
           style={{ background: "#000", color: "#fff" }} 
           >
          <h1 className="flex-1">Aura Ease</h1>
          <div style={{ flex:"1",marginLeft:"20px"}}>
            <Button onClick={login} variant="primary">
              Connect Wallet
            </Button>
          </div>
        </div>
        <div
          className="d-flex justify-content-center flex-column text-center "
          style={{
            background: `url(${coverImg}) no-repeat center center`,
            backgroundColor:  "#000",
            opacity: 0.8,
            backgroundSize: "contain",
            minHeight: "90vh",
          }}
        >

        </div>
      </>
    );
  }
  return null;
};

Cover.propTypes = {
  title: PropTypes.string,
};

Cover.defaultProps = {
  title: "",
};

export default Cover;
