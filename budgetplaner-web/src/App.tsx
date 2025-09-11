import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import styles from "./styles/App.module.css";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      {/* Navigation oben */}
      <NavBar />

      {/* Hauptbereich für die Seiten */}
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* später kommen hier noch mehr Seiten */}
        </Routes>
      </main>

      <Footer /> {/* immer unter */}
    </>
  );
}

export default App
