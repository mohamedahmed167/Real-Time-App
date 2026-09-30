import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   setError("");

   if (formData.password !== formData.confirmPassword) {
     setError("Passwords do not match");
     return;
   }

   if (formData.password.length < 6) {
     setError("Password must be at least 6 characters");
     return;
   }

   setLoading(true);

   try {
     const data = await registerUser({
       username: formData.username,
       email: formData.email,
       password: formData.password,
     });

     console.log("Register success:", data);
     navigate("/login")
   } catch (error) {
     setError(error.message);
   } finally {
     setLoading(false);
   }
 };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    error,
    handleChange,
    togglePassword,
    toggleConfirmPassword,
    handleSubmit,
  };
}

export default useRegister;
