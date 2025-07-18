import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await axios.get("/api/contacts");
    setContacts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    await axios.post("/api/contacts", form);
    setForm({ name: "", email: "", phone: "" });
    fetchContacts();
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Contact App</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", margin: "5px 0" }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", margin: "5px 0" }}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={{ width: "100%", margin: "5px 0" }}
        />
        <button type="submit" style={{ width: "100%" }}>Add Contact</button>
      </form>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.email} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

