import {useEffect, useState} from "react";
import ProductList from "../ProductList/ProductList";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

import './Search.css'

const Search = () => {

    const [products, setProducts] = useState([]);

    const location = useLocation()
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        setProducts([]);
        fetch('http://localhost:1234/search')
            .then((response) => response.json())
            .then((data) => {
                setProducts([]);
                for(let i = 0; i < Math.min(10, data['products'].length); i++) {
                    fetch('http://localhost:1234/lookup/'+data['products'][i])
                        .then((response) => response.json())
                        .then((data) => {
                            setProducts(p => [...p, data]);
                        });
                }
            });
    }, []);

    return (
        <div className="SearchPage">
            <span className="Search-Title">Search results for '{query}'</span>
            <ProductList products={products}/>
        </div>
    );
}

export default Search;