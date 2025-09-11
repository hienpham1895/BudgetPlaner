import styles from "../styles/NavBar.module.css";

export default function NavBar() {
    return (
        <header className={styles.nav}>
            <div className={styles.brand}>BudgetPlaner</div>
            <nav className={styles.links}>
                <a href="/">Home</a>
                <a href="/expenses">Ausgaben</a>
                <a href="/incomes">Einnahmen</a>
                <a href="/summary">Monats-Übersicht</a>
                <a href="/budget">Monatliches Budget</a>
            </nav>
        </header>
    );
}