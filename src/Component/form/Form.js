import { useState } from "react";
import React from "react";
import BuyerPage from "../Buyer/BuyerPage";
import Seller from "../Seller/Seller";
import { Link } from 'react-router-dom';
import "./Form.css";
function Form({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState(
    { firstName:"",lastName:"",phone:"",email: "", password: "" });
  const [user, setUser] = useState({ buyer: false, seller: false });

  const [logIn, setLogIn] = useState({
    title: false,
    user: false,
    button: "SIGNUP",
  });
  const handleSubmit = async (event) => {

    event.preventDefault();

    const payload = {
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      phone: inputValue.phone,
      email: inputValue.email,
      password: inputValue.password,
      role: user.buyer ? "buyer" : "seller",
    };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer {{authToken}}");
  
  const raw = JSON.stringify({
    firstName: inputValue.firstName,
    lastName: inputValue.lastName,
    phone: inputValue.phone,
    email: inputValue.email,
    password: inputValue.password,
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("{{api_url}}/api/users/sign-up", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    
}
  return (
    <div className="container">
      <div className="form">
        <form id="form" onSubmit={handleSubmit}>
          <div className="header box"></div>
          <hr />
          <div className="title box">
            <h1 className="main">{logIn.title ? "LOG IN" : "SIGN UP"}</h1>
          </div>
          <hr />
          {!logIn.title && (
            <div>
              <div className="firstName box">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={inputValue.firstName}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="lastName box">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={inputValue.lastName}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className="name box">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={inputValue.phone}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: e.target.value,
                  email: inputValue.email,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          <div></div>
          <div className=" box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="admin@gmail.com"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: inputValue.phone,
                  email: e.target.value,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          <div className=" box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: inputValue.phone,
                  email: inputValue.email,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className=" box">
            <label>Choose Any one</label>
            <label>
              <input
                type="radio"
                value="option1"
                checked={user.buyer}
                onChange={(e) => setUser({ buyer: true, seller: false })}
              />
              Buyer
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={user.seller}
                onChange={(e) => setUser({ buyer: false, seller: true })}
              />
              Seller
            </label>
          </div>
         
    
          <div className="box">
            <button className="button_container">
              <p className="button_content" id="submit">
            
              {user.buyer===false && user.seller===false? <span>{logIn.button}</span>:''}
              {user.buyer===true ?
      <Link to="/buyer"> {logIn.button}</Link>:  ''}
  
  {user.seller===true?
      <Link to="/seller"> {logIn.button}</Link>:  ''}
  </p>
            </button>
          </div>
          <div className="user box">
            {logIn.user ? (
              <p id="user">
                A new user?
                <u
                  onClick={(e) =>
                    setLogIn({ title: false, user: false, button: "SIGNUP" })
                  }
                >
                  SignUp
                </u>
              </p>
            ) : (
              <p id="user">
                Already an user?
                <u
                  onClick={(e) =>
                    setLogIn({ title: true, user: true, button: "LOGIN" })
                  }
                >
                  Login
                </u>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;