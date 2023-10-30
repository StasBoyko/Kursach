import { BrowserRouter, Routes } from "react-router-dom";
import { Header,AuthLayout } from "./componetns";
import { useUserStore } from "./store";
import { useEffect, useState } from "react";
import userApi from "./api/userApi";


function App() {

  const {isAuth,user,setAuth}=useUserStore()

  useEffect(()=>{
    userApi.rehost(setAuth)
  },[])



  return (
    <AuthLayout isAuth={isAuth}/>
  );
}

export default App;
