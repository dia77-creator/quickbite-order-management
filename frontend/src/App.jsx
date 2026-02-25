import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderStatusPage from "./pages/OrderStatusPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
         
        <Route path="/" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success/:id" element={<OrderSuccess />} />
        <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;