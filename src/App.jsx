import { useEffect } from "react"
import api from "./services/api.js"
import { Outlet } from "react-router-dom"
function App() {

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await api.get("/health");
      console.log(res);
    }

    fetchData();
  },[])

  return (
    <main className="h-screen flex flex-col justify-center  items-center bg-slate-600 ">
    <Outlet/>
    </main>
    
  )
}

export default App
