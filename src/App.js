import React, { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]); // 🔹 List of expenses

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please fill all fields");

    try {
      await addDoc(collection(db, "expenses"), {
        title,
        amount: parseFloat(amount),
        date: new Date(),
      });
      alert("Expense added!");
      setTitle("");
      setAmount("");
      fetchExpenses(); // 🔹 Refresh after adding
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Error saving expense");
    }
  };

  // 🔹 Fetching expenses from Firestore
  const fetchExpenses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "expenses"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <h1>💸 Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <h2>📋 Expenses</h2>
      <ul>
        {expenses.map((item) => (
          <li key={item.id}>
            {item.title} - ₹{item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
