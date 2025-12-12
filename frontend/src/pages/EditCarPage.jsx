import { useState, useEffect } from "react";
import useField from "../hooks/useField";
import { useParams, useNavigate } from "react-router-dom";

const EditCarPage = () => {
  const { id } = useParams();

  
  const make = useField("text");
  const [makeValue, setMakeValue] = useState("");

  const [model, setModel] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [renter, setRenter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

 const updateCar = async (car) => {
  try {
    const res = await fetch(`/api/cars/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(car),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to update car:", errorData);
      throw new Error("Failed to update car");
    }

    return true;
  } catch (error) {
    console.error("Error updating car:", error);
    return false;
  }
};


  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        // Set form fields on fetch success
        setMakeValue(data.make);  
        setModel(data.model);
        setIsAvailable(data.availability.isAvailable);
        setRenter(data.availability.renter);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const [loading, setLoading] = useState(true);

  const handleMakeChange = (e) => {
    setMakeValue(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedCar = {
      id,
      make: makeValue,  
      model,
      availability: {
        isAvailable,
        renter,
      },
    };
    console.log("Submitting updated car:", updatedCar);

    const success = await updateCar(updatedCar);
    if (success) {
      navigate(`/cars/${id}`);
    } else {
      console.error("Failed to update the car");
    }
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.value === "Yes");
  };

  return (
    <div className="create">
      <h2>Update Car</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Car Make:</label>
          <input
            type={make.type}        
            required
            value={makeValue}
            onChange={handleMakeChange}
          />

          <label>Car Model:</label>
          <input
            type="text"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label>Availability:</label>
          <select
            value={isAvailable ? "Yes" : "No"}
            onChange={handleAvailabilityChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Renter:</label>
          <input
            type="text"
            value={renter}
            onChange={(e) => setRenter(e.target.value)}
          />

          <button>Update Car</button>
        </form>
      )}
    </div>
  );
};

export default EditCarPage;
