import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-001",
          customer: "Bereket",
          items: 3,
          total: 120,
          status: "Pending",
        },
        {
          id: "ORD-002",
          customer: "Abel",
          items: 2,
          total: 85,
          status: "Completed",
        },
        {
          id: "ORD-003",
          customer: "Sara",
          items: 5,
          total: 210,
          status: "Preparing",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status pending";
      case "Preparing":
        return "status preparing";
      case "Completed":
        return "status completed";
      default:
        return "status";
    }
  };

  return (
    <section className="page-card">
      <h2>Orders Management</h2>
      <p>View, track, and manage cafeteria orders efficiently.</p>

      <div className="orders-controls">
        <input
          type="text"
          placeholder="Search order or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>Completed</option>
        </select>
      </div>

      {loading && <p>Loading orders...</p>}

      {!loading && filteredOrders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total (ETB)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>{order.total}</td>

                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <button className="btn-view">View</button>
                  <button className="btn-update">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && filteredOrders.length === 0 && (
        <p>No orders found.</p>
      )}
    </section>
  );
};

export default Orders;