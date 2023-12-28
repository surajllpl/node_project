import React from "react";
import { Link,useNavigate } from "react-router-dom";

const Nav=()=>{
    const authr = localStorage.getItem('user');
    const navigate = useNavigate();
  
    const logout =()=>
    {
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
                <img alt="logo" className="logo" src="demo_logo.jpg" />
                {authr ?  <ul className="Nav-ul">
                <li><Link to ="/">Products</Link></li>
                <li><Link to ="/add">Add products</Link></li>
                <li><Link to ="/update">Update products</Link></li>
                <li><Link to ="/profile">Profile</Link></li>
                <li><Link onClick={logout} to ="/signup">Logout {JSON.parse(authr).name} </Link></li> 
                </ul> :<ul className="Nav-ul Nav-right">
                <>
                <li><Link to ="/signup">Sign Up</Link></li>
                <li><Link to ="/login">Login</Link></li>
                </>

            </ul>
            }
        </div>
    )
}
export default Nav;

