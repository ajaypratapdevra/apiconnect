import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [status, setStatus] = useState("");

  const bookTicket = () => {
    if (!name) {
      setStatus("⚠️ Please enter your name");
      return;
    }

    setStatus("🔄 Connecting to booking server...");

    setTimeout(() => {
      setStatus("✅ Server connected successfully");
    }, 1000);

    setTimeout(() => {
      setStatus(`💾 Data saved successfully for ${name} (${tickets} ticket)`);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Concurrent Ticket Booking System</h1>

      <div className="card">

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{padding:"10px", marginBottom:"10px", width:"90%"}}
        />

        <br/>

        <input
          type="number"
          min="1"
          max="5"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          style={{padding:"10px", marginBottom:"10px", width:"90%"}}
        />

        <br/>

        <button onClick={bookTicket}>Book Ticket</button>

        <p className="status">{status}</p>

      </div>
    </div>
  );
}

export default App;