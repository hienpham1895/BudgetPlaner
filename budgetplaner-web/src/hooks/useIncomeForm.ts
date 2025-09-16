import { useEffect, useState } from "react";
import { createIncome, getIncomes, type Income } from "../services/income";

export function useIncomeForm() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [items, setItems] = useState<Income[]>([]);

  useEffect(() => {
    (async () => { try { setItems(await getIncomes()); } catch (e) { console.error(e); } })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setSaving(true);
    try {
      const created = await createIncome({
        date: (date ? new Date(date) : new Date()).toISOString(),
        amount: Number(amount.replace(",", ".")),
        note: description.trim() || null,
      });
      setItems(prev => [created, ...prev]);
      setDate(""); setAmount(""); setDescription("");
      setMsg("Gespeichert ✅");
    } catch (err) {
      console.error(err);
      setMsg("Speichern fehlgeschlagen ❌");
    } finally {
      setSaving(false);
    }
  }

  return { date, setDate, amount, setAmount, description, setDescription, saving, msg, items, onSubmit };
}
