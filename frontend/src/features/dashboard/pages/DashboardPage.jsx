import useDashboard from "../hooks/useDashboard";

const DashboardPage = () => {
  const { stats, loading } = useDashboard();

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section className="page-card">
      <h2>Ministry Cafeteria Dashboard</h2>

      <p>Total Orders: {stats?.totalOrders}</p>
      <p>Total Revenue: {stats?.revenue} ETB</p>
      <p>Pending Orders: {stats?.pendingOrders}</p>
    </section>
  );
};

export default DashboardPage;