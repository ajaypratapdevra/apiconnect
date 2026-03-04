import { useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketsLeft, setTicketsLeft] = useState(5);

  const bookTicket = () => {
    if (ticketsLeft <= 0) {
      setStatus("❌ All tickets sold out");
      return;
    }

    setLoading(true);
    setStatus("🔄 Connecting to booking server...");

    setTimeout(() => {
      setStatus("⚙️ Processing booking request...");
    }, 1000);

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        setTicketsLeft(ticketsLeft - 1);
        setStatus("✅ Ticket booked successfully!");
      } else {
        setStatus("⚠️ Booking failed due to concurrency conflict");
      }

      setLoading(false);
    }, 2500);
  };

  return (
    <div className="container">
      <h1>Concurrent Ticket Booking System</h1>

      <div className="card">
        <p>Available Tickets: <b>{ticketsLeft}</b></p>

        <button onClick={bookTicket} disabled={loading}>
          {loading ? "Processing..." : "Book Ticket"}
        </button>

        <p className="status">{status}</p>
      </div>
    </div>
  );
}

export default App;