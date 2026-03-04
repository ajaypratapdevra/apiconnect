import React, { useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  const bookTicket = async () => {
    try {

      const response = await fetch(
        "https://apiconnect-wwkk.onrender.com/api/book",
        { method: "POST" }
      );

      const data = await response.json();

      setMessage(
        "Booking ID: " + data.bookingId +
        " | Remaining Seats: " + data.remaining
      );

    } catch (err) {
      setMessage("Server not available");
    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h1>Concurrent Ticket Booking</h1>

      <button
        onClick={bookTicket}
        style={{
          padding:"12px 25px",
          fontSize:"18px",
          cursor:"pointer"
        }}
      >
        Book Ticket
      </button>

      <p style={{marginTop:"20px", fontSize:"18px"}}>
        {message}
      </p>

    </div>
  );
}

export default App;