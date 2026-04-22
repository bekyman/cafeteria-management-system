import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { pathname } = useLocation();
  const defaultTab = useMemo(() => {
    if (pathname === "/login/staff") return "staff";
    if (pathname === "/login/access") return "access";
    return "staff";
  }, [pathname]);

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Login failed");
        return;
      }

      setToken(result.token || "");
      setMessage(`Login successful (${result.user?.role || "USER"})`);
    } catch {
      setMessage("Network error while logging in");
    } finally {
      setLoading(false);
    }
  };

  const submitEmployeeRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Employee registration failed");
        return;
      }

      setToken(result.token || "");
      setMessage("Employee registration successful");
    } catch {
      setMessage("Network error while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card">
      <h2>Account Access</h2>
      <p className="auth-note">
        Staff (admin, manager, cashier, inventory) and cafeteria users
        (employee/guest) use this page.
      </p>

      <div className="auth-tabs">
        <button
          type="button"
          className={activeTab === "staff" ? "active" : ""}
          onClick={() => setActiveTab("staff")}
        >
          Staff Login
        </button>
        <button
          type="button"
          className={activeTab === "access" ? "active" : ""}
          onClick={() => setActiveTab("access")}
        >
        </button>
      </div>

      {activeTab === "staff" ? (
        <form className="auth-form" onSubmit={submitLogin}>
          <label>
            Username (email or name)
            <input
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      ) : (
        <div className="auth-access">
          <form className="auth-form" onSubmit={submitEmployeeRegister}>
            <h3>New Employee Registration</h3>
            <label>
              Full Name
              <input
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </label>
            <label>
              Organization Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="name@moh.gov.et"
                required
              />
            </label>
            <label>
              Employee ID
              <input
                value={registerForm.employeeId}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Register Employee"}
            </button>
          </form>

          <div className="auth-form">
            <h3>Existing Employee / Guest Login</h3>
            <p>Use the same login endpoint with your assigned credentials.</p>
            <Link to="/login/staff">Go to Login Form</Link>
          </div>
        </div>
      )}

      {!!message && <p className="auth-message">{message}</p>}
      {!!token && <p className="auth-token">Token received (copy from network response)</p>}
    </section>
  );
};

export default Login;
