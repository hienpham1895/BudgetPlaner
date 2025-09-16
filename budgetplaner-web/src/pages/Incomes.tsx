import IncomesView from "../components/IncomesView";
import { useIncomeForm } from "../hooks/useIncomeForm";

export default function Incomes() {
  const f = useIncomeForm();
  return (
    <IncomesView
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
    />
  );
}
