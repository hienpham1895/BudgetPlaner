import styles from "../styles/Expenses.module.css";
import type { Expense } from "../services/api";

type Props = {
  date: string;
  amount: string;
  description: string;
  onDate: (v: string) => void;
  onAmount: (v: string) => void;
  onDescription: (v: string) => void;
  saving: boolean;
  msg: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  items: Expense[];
  editingId: number | null;
  startEdit: (it: Expense) => void;
  cancelEdit: () => void;
  remove: (id: number) => void;
  formClassName?: string;           // behalten wir – falls du extern stylen willst
};

export default function ExpensesView(p: Props) {
  return (
    <>
      <div className={styles.expenses}>
        <h1>Ausgaben</h1>
      </div>

      <div className={styles.formWrapper}>
        <form className={p.formClassName ?? styles.form} onSubmit={p.onSubmit}>
          <label htmlFor="datum">Datum:</label>
          <input
            id="datum"
            type="date"
            value={p.date}
            onChange={(e) => p.onDate(e.target.value)}
          />

          <label htmlFor="betrag">Betrag:</label>
          <input
            id="betrag"
            type="number"
            step="0.01"
            placeholder="€"
            value={p.amount}
            onChange={(e) => p.onAmount(e.target.value)}
          />

          <label htmlFor="beschreibung">Beschreibung:</label>
          <input
            id="beschreibung"
            type="text"
            placeholder="Wofür?"
            value={p.description}
            onChange={(e) => p.onDescription(e.target.value)}
          />

          <div className={styles.formActions}>
            {p.editingId !== null && (
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnWide}`}
                onClick={p.cancelEdit}
              >
                Abbrechen
              </button>
            )}
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWide}`}
              disabled={p.saving}
            >
              {p.editingId !== null
                ? (p.saving ? "Aktualisiere..." : "Aktualisieren")
                : (p.saving ? "Speichern..." : "Speichern")}
            </button>
          </div>

          {p.msg && <p style={{ marginTop: 8 }}>{p.msg}</p>}
        </form>
      </div>

      <h3 className={styles.listTitle}>Letzte Ausgaben</h3>
      <div className={styles.list}>
        {p.items.length === 0 ? (
          <p className={styles.empty}>Noch keine Ausgaben gespeichert.</p>
        ) : (
          <ul className={styles.items}>
            {p.items.map((it) => (
              <li key={it.id} className={styles.item}>
                <span className={styles.date}>
                  {new Date(it.date).toLocaleDateString("de-DE")}
                </span>
                <span className={styles.note}>{it.note ?? "—"}</span>
                <span className={styles.amount}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(it.amount)}
                </span>
                <div className={styles.rowActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}
                    onClick={() => p.startEdit(it)}
                  >
                    Ändern
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnDanger}`}
                    onClick={() => p.remove(it.id)}
                  >
                    Löschen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
