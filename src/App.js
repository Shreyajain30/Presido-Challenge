// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BuyerPage from "./Component/Buyer/BuyerPage";
import Form from "./Component/form/Form";
import Seller from './Component/Seller/Seller.js'
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route exact path="/buyer" element={<BuyerPage />} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
