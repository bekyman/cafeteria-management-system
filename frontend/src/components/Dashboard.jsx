import useReports from "../hooks/useReports";

export default function Dashboard() {
  const { data, loading, error } = useReports();

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  const { summary, topFoods, orderStats } = data;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <p>Total Orders</p>
          <h2>{summary.totalOrders}</h2>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p>Total Revenue</p>
          <h2>${summary.totalRevenue}</h2>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p>Pending</p>
          <h2>{summary.pendingOrders}</h2>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <p>Completed</p>
          <h2>{summary.completedOrders}</h2>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Top Foods</h2>
        <ul>
          {topFoods.map((food) => (
            <li key={food.foodId}>
              {food.name} - {food.totalSold} sold
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold">Order Status</h2>
        <ul>
          {orderStats.map((s) => (
            <li key={s._id}>
              {s._id}: {s.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}