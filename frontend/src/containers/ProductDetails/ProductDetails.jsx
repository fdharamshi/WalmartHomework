import './ProductDetails.css'
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductList from "../ProductList/ProductList";

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        fetch('http://localhost:1234/lookup/'+id)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data['images'][0]);
                if(data.colors) {
                    setSelectedColor(data.colors[0]);
                }
                if(data.sizes) {
                    setSelectedSize(data.sizes[0]);
                }
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
                        <img className={selectedImage === image? "product-images-image-selected" : "product-images-image"} src={image} key={idx} onClick={()=>{
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
                    <button className="pd-item-add-btn" onClick={()=>{
                        navigator('/not-implemented');
                    }
                    }>Add to Cart</button>
                    {product['colors'] && <><hr />
                    <span style={{fontWeight: "bold"}}>Color: </span><span>{selectedColor}</span>
                     <div className="pd-color-options">
                        {product['colors'].map((color) =>
                            <div className={selectedColor === color? "pd-color-option-selected" : "pd-color-option"} onClick={()=>{
                                setSelectedColor(color)}
                            }>
                                <div className="pd-color" style={{backgroundColor: color}}></div>
                            </div>
                        )}
                    </div></>}
                    {product['sizes'] && <><hr />
                    <span style={{fontWeight: "bold"}}>Size: </span><span>{selectedSize}</span>
                     <div className="pd-size-options">
                        {product['sizes'].map((size) =>
                            <div className={selectedSize === size? "pd-color-option-selected":"pd-color-option"} onClick={()=>{
                                setSelectedSize(size)}
                            }>
                                {size}
                            </div>
                        )}
                    </div></>}

                </div></div>
            </div>}
            <hr />
            <div className="Recommendations">
                <span className="Reco-Title">Recommendations based on your Choice:</span>
                {recommendations.length > 0 && <ProductList products={recommendations} />}
            </div>
            </>
    );

}

export default ProductDetails;