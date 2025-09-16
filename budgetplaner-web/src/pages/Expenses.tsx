import ExpensesView from "../components/ExpensesView";
import { useExpenseForm } from "../hooks/useExpenseForm";
import styles from "../styles/Expenses.module.css";

export default function Expenses() {
  const f = useExpenseForm();

  return (
    <ExpensesView
      formClassName={styles.form}
      date={f.date}
      amount={f.amount}
      description={f.description}
      onDate={f.setDate}
      onAmount={f.setAmount}
      onDescription={f.setDescription}
      saving={f.saving}
      msg={f.msg}
      onSubmit={f.onSubmit}
      items={f.items}
      editingId={f.editingId}
      startEdit={f.startEdit}
      cancelEdit={f.cancelEdit}
      remove={f.remove}
    />
  );
}
