import './ProductDetails.css'
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductList from "../ProductList/ProductList";

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1234/lookup/'+id)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data['images'][0]);
            });

        setRecommendations([]);
        fetch('http://localhost:1234/recommendations')
            .then((response) => response.json())
            .then((data) => {
                setRecommendations([]);
                for(let i = 0; i < Math.min(10, data['products'].length); i++) {
                    fetch('http://localhost:1234/lookup/'+data['products'][i])
                        .then((response) => response.json())
                        .then((data) => {
                            setRecommendations(reco => [...reco, data]);
                        });
                }
            });
    }, [id]);

    return (
        <>
            {product && <div className="Product-Details">
                <div><div className="product-images">
                    {product['images'].map((image, idx) =>
                        <img className="product-images-image" src={image} key={idx} onClick={()=>{
                            setSelectedImage(image);
                        }
                        }/> )}
                </div></div>
                <div className="product-image">
                    <img className="product-images-image" src={selectedImage}/>
                </div>
                <div><div className="product-information">
                    <span className="pd-product-name">{product.name}</span>
                    <div className="item-rating">
                        {(() => {
                            const stars = [];

                            for (let i = 1; i <= parseInt(product['rating']); i++) {
                                stars.push(<AiFillStar />);
                            }

                            for (let i = parseInt(product['rating']); i < 5; i++) {
                                stars.push(<AiOutlineStar />);
                            }

                            return stars;
                        })()}
                        (3.8) 231 reviews
                    </div>
                    <div className="pd-price">
                        <span className="pd-item-price">NOW ${product.price}</span>
                        {product.old_price && <span className="pd-item-old-price">${product.old_price}</span>}
                    </div>
                    <button className="pd-item-add-btn">Add to Cart</button>
                    <hr />
                    <span style={{fontWeight: "bold"}}>Color: </span><span>Black</span>
                    {product['colors'] && <div className="pd-color-options">
                        {product['colors'].map((color) =>
                            <div className="pd-color-option">
                                <div className="pd-color" style={{backgroundColor: color}}></div>
                            </div>
                        )}
                    </div>}
                    <hr />
                    <span style={{fontWeight: "bold"}}>Size: </span><span>1X</span>
                    {product['sizes'] && <div className="pd-size-options">
                        {product['sizes'].map((size) =>
                            <div className="pd-color-option">
                                {size}
                            </div>
                        )}
                    </div>
                    }
                </div></div>
            </div>}
            <hr />
            {recommendations.length > 0 && <ProductList products={recommendations} />}
            </>
    );

}

export default ProductDetails;