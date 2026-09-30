import { createContext ,useContext,useEffect,useState } from "react";
import { getCurrnetUser } from "../services/authServices";
const AuthContext =createContext()
export function AuthProvider({ children}) {
  const [user, setUser] = useState(null);
  const [loading ,setLoading]=useState(true)
  const token = localStorage.getItem("token");
  useEffect(()=>{
    const fetchCurrentUser =async()=>{
      if(!token){
        setLoading(false)
        return
      }
      try{
        const data =await getCurrnetUser(token)
        setUser(data.user)
      }catch(error){
        console.log("faild to get currnet user",error)
        localStorage.removeItem("token")
        setUser(null)
      }finally{
        setLoading(false)
      }
    }
    fetchCurrentUser()
  },[token])



  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext)
}
