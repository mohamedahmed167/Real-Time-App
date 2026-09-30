import { useState } from "react";
import { loginUser } from "../services/authServices";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function useLogin(){
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [showPassword,setShowPassword]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const handleChange =(e)=>{
    const {name,value} =e.target
    setFormData((prev)=>({
      ...prev ,[name]:value
    }))
  }
  const togglePassword =()=>{
    setShowPassword((prev)=>!prev)
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
      console.log("SUBMIT WORKED");
    setError("")
    setLoading(true)
    try{
      const data =await loginUser(formData)
     console.log("LOGIN SUCCESS:", data);
      localStorage.setItem("token",data.token)

      navigate("/home");

    }catch(error){
      setError(error.message)
    }finally{
      setLoading(false)
    }

  }
  return {
    formData,togglePassword,showPassword,loading,error,handleChange,handleSubmit
  }
}
export default useLogin
