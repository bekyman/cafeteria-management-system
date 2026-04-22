import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      redirectByRole(res.data.user.role);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const redirectByRole = (role) => {
    switch (role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "KITCHEN":
        navigate("/kitchen");
        break;
      case "STAFF":
        navigate("/staff");
        break;
      case "CAFETERIA":
        navigate("/cafeteria");
        break;
      default:
        navigate("/employee");
    }
  };

  return (
    <form onSubmit={submitLogin}>
      <h2>Cafeteria Login</h2>

      <input
        placeholder="Email or Employee ID"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;