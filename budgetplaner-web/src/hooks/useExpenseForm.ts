import { useEffect, useState } from "react";
import { createExpense, getExpenses, updateExpense, deleteExpense, type Expense } from "../services/api";

const toInputDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

export function useExpenseForm() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [items, setItems] = useState<Expense[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // ← NEU

  useEffect(() => { (async () => setItems(await getExpenses()))().catch(console.error); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(""); setSaving(true);

    const payload = {
      date: (date ? new Date(date) : new Date()).toISOString(),
      amount: Number(amount.replace(",", ".")),
      note: description.trim() || null,
    };

    try {
      if (editingId == null) {
        const created = await createExpense(payload);
        setItems(p => [created, ...p]);
        setMsg("Gespeichert ✅");
      } else {
        const updated = await updateExpense(editingId, payload);
        setItems(p => p.map(x => x.id === editingId ? updated : x));
        setEditingId(null);
        setMsg("Aktualisiert ✅");
      }
      setDate(""); setAmount(""); setDescription("");
    } catch (err) {
      console.error(err);
      setMsg("Speichern fehlgeschlagen ❌");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(it: Expense) {            // ← NEU
    setEditingId(it.id);
    setDate(toInputDate(it.date));
    setAmount(String(it.amount));
    setDescription(it.note ?? "");
    setMsg("");
  }

  function cancelEdit() {                      // ← NEU
    setEditingId(null);
    setDate(""); setAmount(""); setDescription("");
  }

  async function remove(id: number) {          // ← NEU
    try {
      await deleteExpense(id);
      setItems(p => p.filter(x => x.id !== id));
    } catch (e) {
      console.error(e);
      setMsg("Löschen fehlgeschlagen ❌");
    }
  }

  return {
    date, setDate, amount, setAmount, description, setDescription,
    saving, msg, items, onSubmit,
    editingId, startEdit, cancelEdit, remove,   // ← NEU
  };
}
