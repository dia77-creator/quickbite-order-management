import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



function Navbar({ cartCount }) {
    const { cart } = useContext(CartContext);

const totalItems = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);
  return (
    <nav className="navbar">
      <h2 className="logo">🍔 QuickBite</h2>

      <div className="nav-links">
        <Link to="/">Menu</Link>

        <Link to="/checkout" className="cart-icon">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;