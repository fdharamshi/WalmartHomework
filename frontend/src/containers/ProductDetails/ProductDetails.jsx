import './ProductDetails.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import ProductInformation from "./ProductInformation";

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {

        if (isNaN(id)) {

            // Invalid ID in the query

            navigator('/');
        }

        fetch('http://localhost:1234/lookup/' + id)
            .then((response) => response.json())
            .then((data) => {

                if (data.error) {
                    navigator('/');
                }

                setProduct(data);
                setSelectedImage(data['images'][0]);
            });

        setRecommendations([]);
        fetch('http://localhost:1234/recommendations')
            .then((response) => response.json())
            .then((data) => {
                setRecommendations([]);
                for (let i = 0; i < Math.min(10, data['products'].length); i++) {
                    fetch('http://localhost:1234/lookup/' + data['products'][i])
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
                        <img className={selectedImage === image ? "product-images-image-selected" : "product-images-image"} src={image} key={idx} onClick={() => {
                            setSelectedImage(image);
                        }
                        } />)}
                </div></div>
                <div className="product-image">
                    <img className="product-images-image" src={selectedImage} />
                </div>
                <div><ProductInformation product={product} /></div>
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