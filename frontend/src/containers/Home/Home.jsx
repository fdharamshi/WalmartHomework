import './Home.css';
import {AiFillStar, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import ProductList from "../ProductList/ProductList";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1234/')
            .then((response) => response.json())
            .then((data) => {
                setProducts([]);
                for(let i = 0; i < Math.min(10, data['products'].length); i++) {
                    fetch('http://localhost:1234/lookup/'+data['products'][i])
                        .then((response) => response.json())
                        .then((data) => {
                            setProducts(products => [...products, data]);
                        });
                }
            });
    }, []);

    return (
        <div className="Home">
            <img src="https://i.ibb.co/rwbmdCB/Screenshot-2022-11-04-at-12-42-25-PM.png" alt="Screenshot-2022-11-04-at-12-42-25-PM" className="Home-Banner"/>
            <ProductList products={products} />
        </div>
    );
}

export default Home;