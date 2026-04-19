import { useEffect, useState } from "react";

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch {
      console.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrders().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchOrders, 10000); // every 10 sec
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: status }),
    });

    fetchOrders();
  };

    const getMinutesWaiting = (time) => {
    const diff = Date.now() - new Date(time).getTime();
    return Math.floor(diff / 60000);
  };

    const visibleOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  return (
    <section className="page-card">
      <h2>Kitchen Display System</h2>
      <p>Live order preparation board.</p>

      <div className="kitchen-filter">
        {["All", "New", "In Progress", "Completed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="kitchen-grid">
          {visibleOrders.map((order) => (
            <div
              key={order._id}
              className={`kitchen-card status-${order.orderStatus
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <h3>Order #{order._id.slice(-5)}</h3>

              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>

              <p className="timer">
                ⏱ Waiting: {getMinutesWaiting(order.createdAt)} min
              </p>

              <ul>
                {order.items?.map((item) => (
                  <li key={item._id}>
                    {item.foodItemName} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="kitchen-actions">
                {order.orderStatus === "New" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "In Progress")
                    }
                  >
                    Start
                  </button>
                )}

                {order.orderStatus === "In Progress" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Completed")
                    }
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Kitchen;