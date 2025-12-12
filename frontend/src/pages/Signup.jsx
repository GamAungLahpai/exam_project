import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");

  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signup({
      email: email.value,
      password: password.value,
      name: name.value,
    });


    if (result.success) {
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
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        
        {error && (
          <div className="error" style={{ 
            color: 'red', 
            marginTop: '10px',
            padding: '10px',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#ffebee'
          }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;