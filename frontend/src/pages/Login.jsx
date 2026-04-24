import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // ✅ SAVE AUTH SESSION
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      redirectByRole(res.data.user.role);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ ROLE BASED REDIRECTION
  const redirectByRole = (role) => {

    switch (role) {

      case "ADMIN":
        navigate("/");
        break;

      case "KITCHEN":
        navigate("/kitchen");
        break;

      case "CASHIER":
        navigate("/orders");
        break;

      case "INVENTORY":
        navigate("/inventory");
        break;

      case "EMPLOYEE":
        navigate("/menu");
        break;

      default:
        navigate("/login");
    }
  };

  return (
    <form onSubmit={submitLogin}>
      <h2>Cafeteria Login</h2>

      <input
        placeholder="Email or Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;