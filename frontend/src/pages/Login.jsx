import useField from "../hooks/useField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { authenticate: login, error, isLoading } = useAuth("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const user = await login({ email: email.value, password: password.value });

    if (user) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} required />
        <label>Password:</label>
        <input {...password} required />
        <button disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
