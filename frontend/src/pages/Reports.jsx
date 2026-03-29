import useReports from "../features/auth/hooks/useReports";

const Reports = () => {
  const { data, loading, error, refresh } = useReports();

  return (
    <section className="page-card">
      <h2>Reports</h2>
      <p>Dashboard reporting endpoint integration.</p>
      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={refresh}>
          Refresh Reports
        </button>
      </div>
      {loading && <p style={{ marginTop: "0.75rem" }}>Loading report data...</p>}
      {error && (
        <p style={{ marginTop: "0.75rem", color: "#dc2626" }}>
          Failed to load reports: {error}
        </p>
      )}
      {!loading && !error && (
        <pre style={{ marginTop: "0.75rem", overflowX: "auto" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
};

export default Reports;
