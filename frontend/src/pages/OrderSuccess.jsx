import { useParams } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <div>
      <h2>Order Placed Successfully!</h2>
      <p>Your Order ID: {id}</p>
    </div>
  );
}

export default OrderSuccess;