import { useEffect, useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";


function MenuPage() {
  const [menu, setMenu] = useState([]);
  const { cart, addToCart, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("menu/")
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    

  <div className="container">
    <h1>Menu</h1>

    <div className="grid">
      {menu.map(item => (
        <div key={item.id} className="card">
  <img src={item.image_url} alt={item.name} />

  <h3>{item.name}</h3>
  <p>₹{item.price}</p>
   <p>{item.description}</p>

  <div className="qty-controls">
    <button onClick={() => decreaseQty(item.id)}>-</button>
    <span>
      {cart.find(i => i.id === item.id)?.quantity || 0}
    </span>
    <button onClick={() => addToCart(item)}>+</button>
  </div>
</div>
      ))}
    </div>

    <button
      className="checkout-btn"
      disabled={cart.length === 0}
      onClick={() => navigate("/checkout", { state: cart })}
    >
      Checkout
    </button>
  </div>
);

}

export default MenuPage;