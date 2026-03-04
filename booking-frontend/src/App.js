import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "VIP Ticket", price: 1200 },
  { id: 2, name: "Premium Ticket", price: 800 },
  { id: 3, name: "Standard Ticket", price: 400 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
    setStatus(`${product.name} added to cart`);
  };

  const checkout = () => {
    if (cart.length === 0) {
      setStatus("⚠️ Your cart is empty");
      return;
    }

    setStatus("🔄 Connecting to booking server...");

    setTimeout(() => {
      setStatus("✅ Server connected successfully");
    }, 1000);

    setTimeout(() => {
      setStatus("💾 Order saved successfully");
      setCart([]);
    }, 2000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1>Ticket Store</h1>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="card"
            style={{ width: "220px", textAlign: "center" }}
          >
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "40px", maxWidth: "400px", marginInline: "auto" }}>
        <h2>Cart</h2>

        {cart.length === 0 && <p>No items yet</p>}

        {cart.map((item, index) => (
          <p key={index}>
            {item.name} - ₹{item.price}
          </p>
        ))}

        <hr />

        <h3>Total: ₹{total}</h3>

        <button onClick={checkout}>Checkout</button>

        <p className="status">{status}</p>
      </div>
    </div>
  );
}

export default App;