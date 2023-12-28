import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getproductdetails = async () => {
        let res = await fetch(`http://localhost:3000/product/${params.id}`,
        {
          headers:{authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`}

        });
        const data = await res.json();
            setName(data.name);
            setPrice(data.price);
            setCategory(data.category);
            setCompany(data.company);
    };

    getproductdetails();
  }, [params.id]);

  const handleUpdate = async () => {
    // Add logic here to update the product details
        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'content-type': 'application/json',
             authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json();
        if (result) {
          
       navigate('/') 

      }
  };

  return (
    <div>
      <div className="productlist">
        <h1 className="login-head">Update Product</h1>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="inputBox"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          className="inputBox"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          className="inputBox"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <button className="app-Button" type="button" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
