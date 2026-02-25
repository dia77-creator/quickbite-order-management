import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function OrderStatusPage() {
  const { orderId } = useParams();
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const fetchStatus = () => {
      API.get(`orders/${orderId}/`)
        .then(res => {
          setStatus(res.data.status);
        })
        .catch(err => {
          console.error(err);
        });
    };


    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="container">
      <h1>Order Status</h1>
      <h3>Order ID: {orderId}</h3>
      <h2>Status: {status}</h2>
    </div>
  );
}

export default OrderStatusPage;