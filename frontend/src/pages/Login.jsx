const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-3 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;