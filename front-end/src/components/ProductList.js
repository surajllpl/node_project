import React from "react";
import { useState, useEffect } from "react";  //hookes
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

const ProductList = () => {

    const [product, setproduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {

        try {
            let result = await fetch('http://localhost:3000/list-products',{
                headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
            });
            result = await result.json();
            setproduct(result);
            // console.log(product);
        } catch (error) {
            alert(error.message);
        }
    }

    const deleteProduct = async (id) => {
        //var pro_id = id;
        try {
            let result = await fetch(`http://localhost:3000/product/${id}`, {
                method: 'delete',

                headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }

            });
            result = await result.json();
            if (result) {
                getProducts();
                alert("Record is Deleted....");
            }
        } catch (error) {
            alert(error.message);
        }
    }
    // console.warn("product", product);
    const searchHandle = async (event) => {
        try {
            let key = event.target.value;
            if (key.trim() !== "") {
                let result = await fetch(`http://localhost:3000/search/${key}`, {
                    headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }

                });
                result = await result.json();
                if (result) {
                    setproduct(result);
                } else {
                    getProducts();
                }
            } else {
                getProducts();
            }
        } catch (error) {
            alert(error.message);
        }

    }
    return (
        <div className="product-list ul li">
            <h2 className="productlist">Product list</h2>
            <input className="search" type="text" placeholder='Search Product' onChange={searchHandle} />
            <ul>
                <li>s.no</li>
                <li>name</li>
                <li>price</li>
                <li>category</li>
                <li>company</li>
                <li>operation</li>
            </ul>
            {
                product.length > 0 ? product.map((item, index) =>

                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} > update</Link>
                        </li>
                    </ul>
                ) : <h3 className="productlist">Product not found</h3>
            }
        </div>
    );
}

export default ProductList;