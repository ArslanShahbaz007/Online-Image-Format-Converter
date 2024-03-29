import React from "react";
import Navbar from "./Navbar";
import Dropzone from "./Dropzone";
import Footer from "./Footer";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="content-container">
        <div>
          <Navbar />
        </div>
        <div className="contain">
          <h1 style={{color: "black", fontSize: "2.2rem", fontWeight: "bold", marginBottom:'1em'}}>
          Transform Your Images Seamlessly with Our Image Format Converter Tool
          </h1>
          <p>
          Elevate your digital imaging experience with our cutting-edge Image Format Converter tool. Seamlessly convert your images between various formats such as JPEG, PNG, GIF, and more, ensuring compatibility across platforms and devices.
          </p>
        </div>

        <div>
          <Dropzone />
        </div>
      </div>

      <div style={{marginTop:'8rem'}}>
        <Footer />
      </div>
    </>
  );
}

export default Home;
