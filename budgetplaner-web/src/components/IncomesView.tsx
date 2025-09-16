import styles from "../styles/Expenses.module.css"; // CSS wiederverwenden
import type { Income } from "../services/income";

type Props = {
  date: string; amount: string; description: string;
  onDate: (v: string) => void; onAmount: (v: string) => void; onDescription: (v: string) => void;
  saving: boolean; msg: string; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  items: Income[];
};

export default function IncomesView(p: Props) {
  return (
    <>
      <div className={styles.expenses}>
        <h1>Einnahmen</h1>
      </div>

      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={p.onSubmit}>
          <label htmlFor="datum">Datum:</label>
          <input id="datum" type="date" value={p.date} onChange={(e) => p.onDate(e.target.value)} />

          <label htmlFor="betrag">Betrag:</label>
          <input id="betrag" type="number" step="0.01" placeholder="€"
                 value={p.amount} onChange={(e) => p.onAmount(e.target.value)} />

          <label htmlFor="beschreibung">Beschreibung:</label>
          <input id="beschreibung" type="text" placeholder="Woher?"
                 value={p.description} onChange={(e) => p.onDescription(e.target.value)} />

          <button type="submit" className={styles.saveButton} disabled={p.saving}>
            {p.saving ? "Speichern..." : "Speichern"}
          </button>

          {p.msg && <p style={{ marginTop: 8 }}>{p.msg}</p>}
        </form>
      </div>

      <h3 className={styles.listTitle}>Letzte Einnahmen</h3>
      <div className={styles.list}>
        {p.items.length === 0 ? (
          <p className={styles.empty}>Noch keine Einnahmen gespeichert.</p>
        ) : (
          <ul className={styles.items}>
            {p.items.map(it => (
              <li key={it.id} className={styles.item}>
                <span className={styles.date}>{new Date(it.date).toLocaleDateString("de-DE")}</span>
                <span className={styles.note}>{it.note ?? "—"}</span>
                <span className={styles.amount}>
                  {new Intl.NumberFormat("de-DE",{ style:"currency", currency:"EUR" }).format(it.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}