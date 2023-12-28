import React from "react";
import{Navigate,Outlet} from "react-router-dom";

const PrivateComponent =()=>
{
    const authr = localStorage.getItem('user');     //check user Authentication in local storage

    return authr? <Outlet />:<Navigate to = "/signup" /> // if authenticate : outlet- nested routes , otherwise navigate to signup 
   
}
export default PrivateComponent;