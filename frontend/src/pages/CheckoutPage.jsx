import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { cart, clearCart } = useContext(CartContext);


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =await API.post("orders/", {
        name: name,
        address: address,
        phone: phone,
        items: cart.map(item => ({
            menu_item: item.id,
            quantity: item.quantity
        }))
        });

      console.log("Order Created:", res.data);

      navigate(`/order-status/${res.data.id}`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Check console.");
    }
  };

return (
  <div>
    <button className="back-btn" onClick={() => navigate("/")}>
      ← Back to Menu
    </button>

    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <h3>Total: ₹{total}</h3>

      <button type="submit">Place Order</button>
    </form>
  </div>
);
}

export default CheckoutPage;