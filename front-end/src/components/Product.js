import React from "react";
import { useState } from "react";

import {useNavigate}from "react-router-dom";

const Product = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState("");
        const navigate = useNavigate();
    


    const addProduct = async () => {
        //console.war(name);
        if (!name || !price || !category || !company) {
            setError(true);

        }
        try{
        let userId = localStorage.getItem('user');
        userId = JSON.parse(userId)._id;
        let result = await fetch('http://localhost:3000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'content-type': 'application/json',
            authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}` 

            }
        });
        result = await result.json();
        if(result){
        console.warn(result);
        localStorage.setItem("product", JSON.stringify(result));
        setName("")
        setCategory("")
        setCompany("")
        setPrice("")
        alert("Record is Added sucessfuly....");

          navigate('/');
        }
    }catch(error){
        alert(error.message);
    }
    }
    return (
        <div>
            <div className="register">
                <h1 className="login-head">Add Product</h1>
                <input className="inputBox" type="text" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                {error && !name && <span className="invalid-input">Enter valid name</span>}
                <input className="inputBox" type="text" value={price}
                    onChange={(e) => setPrice(e.target.value)} placeholder="price" />
                {error && !price && <span className="invalid-input">Enter valid price</span>}

                <input className="inputBox" type="text" value={category}
                    onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                {error && !category && <span className="invalid-input">Enter valid category</span>}

                <input className="inputBox" type="text" value={company}
                    onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                {error && !company && <span className="invalid-input">Enter valid company</span>}


                <button className="app-Button" type="button" onClick={addProduct} >Add Product</button>
            </div>
        </div>
    )
}
export default Product;