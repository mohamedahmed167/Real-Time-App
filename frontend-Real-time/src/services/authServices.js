const API_URL = "http://localhost:5000/api";
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration Failed");
  }
  return data;
};
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};
export const getCurrnetUser =async(token)=>{
  const response =await fetch(`${API_URL}/user`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  const data =await response.json()
  if(!response.ok){
    throw new Error(data.message || "faikd to get user")
  }
  return data
}
