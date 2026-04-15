import useOrders from "../hooks/useOrders";

const OrdersPage = () => {
  const { orders, loading, error, refetch } = useOrders();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-card">
      <h2>Orders</h2>

      <button onClick={refetch}>Refresh</button>

      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.item} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;