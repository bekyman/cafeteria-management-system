import { useEffect, useState } from "react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    reorderLevel: "",
  });


  const fetchInventory = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setItems(data);
    } catch {
      console.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);


  const addItem = async (e) => {
    e.preventDefault();

    await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      itemName: "",
      quantity: "",
      reorderLevel: "",
    });

    fetchInventory();
  };

  return (
    <section className="page-card">
      <h2>Inventory Management</h2>
      <p>Monitor stock levels and manage cafeteria ingredients.</p>

      {/* ADD ITEM FORM */}
      <form className="inventory-form" onSubmit={addItem}>
        <input
          placeholder="Item name"
          value={form.itemName}
          onChange={(e) =>
            setForm({ ...form, itemName: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Reorder level"
          value={form.reorderLevel}
          onChange={(e) =>
            setForm({ ...form, reorderLevel: e.target.value })
          }
          required
        />

        <button type="submit">Add Item</button>
      </form>

      {/* INVENTORY TABLE */}
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.reorderLevel}</td>
                <td>
                  {item.quantity <= item.reorderLevel ? (
                    <span className="low-stock">
                      ⚠ Low Stock
                    </span>
                  ) : (
                    <span className="ok-stock">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Inventory;