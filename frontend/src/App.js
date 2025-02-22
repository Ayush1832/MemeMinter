import React from "react";
import MemeForm from "./components/MemeForm";
import MemeDisplay from "./components/MemeDisplay";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <MemeForm />
      <MemeDisplay />
    </div>
  );
}

export default App;
