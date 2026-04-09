import { useEffect } from "react"
import api from "./services/api.js"

function App() {

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await api.get("/health");
      console.log(res);
    }

    fetchData();
  },[])

  return (
    <h1 className="h-screen flex , justify-center items-center text-2xl text-slate-700 font-extrabold">Hello World</h1>
  )
}

export default App
