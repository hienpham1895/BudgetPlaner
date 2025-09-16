import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import styles from "./styles/App.module.css";
import Footer from "./components/Footer";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import MonthlySummary from "./pages/MonthlySummary";
import Budget from "./pages/Budget";
import Savings from "./pages/Savings";


function App() {
  return (
    <>
      {/* Navigation oben */}
      <NavBar />

      {/* Hauptbereich für die Seiten */}
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/summary" element={<MonthlySummary />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </main>

      <Footer /> {/* immer unter */}
    </>
  );
}

export default App
