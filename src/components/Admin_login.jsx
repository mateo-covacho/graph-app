import React from "react";
import "./css/Admin_login.css";
import { GrUserWorker } from "react-icons/gr";
import { FaLockOpen, FaLock } from "react-icons/fa";

//____________________________________________

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//____________________________________________

import sha256 from "./Encryption";

//____________________________________________
const Admin_login = (props) => {
  const [word, setWord] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Nice try you sneaky little bee. Dont worry ill tell you the access password if you contact me
  // through twitter or email at mateocovacho@gmail.com :)
  const passwordhash =
    "34ddf679b4b0ed44ce874ec3e11cf84359acb7a09bacaa3e50232bbdce8da5b3";
  const twitterPasswordHash =
    "7352f353c460e74c7ae226952d04f8aa307b12329c5512ec8cb6f1a0f8f9b2cb";
  useEffect(() => {
    if (sha256(word) === passwordhash || sha256(word) === twitterPasswordHash) {
      setIsAdmin(true);
      props.isAdminFuncion(true);
    } else {
      setIsAdmin(false);
      props.isAdminFuncion(false);
    }
  });

  return (
    <div className="container">
      <h2>{isAdmin}</h2>
      <h1 className="mx-auto col-10 display-1 text-center">
        Under constuction
      </h1>
      <div className="icon-wrapper mx-auto col-2">
        <GrUserWorker color="red" size={"100%"} />
      </div>
      <h1 className="mx-auto col-6 display-1 text-center">Admin login</h1>

      <div class="input-group">
        <input
          type="password"
          class="form-control"
          placeholder="Development key"
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        {isAdmin == true ? (
          <Link to="/dashboard">
            <button
              type="button"
              class="btn btn-outline-secondary green-background"
              id="input-group-button-right"
            >
              Access
              <span> </span>
              <FaLockOpen className="openlock" />
              <span> </span>
            </button>
          </Link>
        ) : (
          <button
            type="button"
            class="btn btn-outline-secondary "
            id="input-group-button-right"
          >
            Access
            <span> </span>
            <FaLock />
            <span> </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Admin_login;
