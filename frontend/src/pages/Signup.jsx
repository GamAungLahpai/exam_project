import useField from "../hooks/useField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");

  const { authenticate: signup, error, isLoading } = useAuth("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const user = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (user) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} required />
        <label>Email address:</label>
        <input {...email} required />
        <label>Password:</label>
        <input {...password} required />
        <button disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</button>
        {error && (
          <div
            className="error"
            style={{
              color: "red",
              marginTop: "10px",
              padding: "10px",
              border: "1px solid red",
              borderRadius: "4px",
              backgroundColor: "#ffebee",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
