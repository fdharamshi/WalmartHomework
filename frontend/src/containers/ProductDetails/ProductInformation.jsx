import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import './ProductDetails.css'

const ProductInformation = (props) => {

    const product = props.product;

    const navigator = useNavigate();

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {

        if (product.colors) {
            setSelectedColor(product.colors[0]);
        }
        if (product.sizes) {
            setSelectedSize(product.sizes[0]);
        }

    }, [product])

    return (
        <div className="product-information">
            <span className="pd-product-name" data-testid="pd-name">{product.name}</span>
            <div className="item-rating">
                {(() => {
                    const stars = [];

                    for (let i = 1; i <= parseInt(product['rating']); i++) {
                        stars.push(<AiFillStar key={i} />);
                    }

                    for (let i = parseInt(product['rating']) + 1; i <= 5; i++) {
                        stars.push(<AiOutlineStar key={i} />);
                    }

                    return stars;
                })()}
                (3.8) 231 reviews
            </div>
            <div className="pd-price">
                <span className="pd-item-price" data-testid="pd-price">NOW ${product.price}</span>
                {product.old_price && <span className="pd-item-old-price" data-testid="pd-old-price">${product.old_price}</span>}
            </div>
            <button className="pd-item-add-btn" onClick={() => {
                navigator('/not-implemented');
            }
            }>Add to Cart</button>
            {product['colors'] && <><hr />
                <span style={{ fontWeight: "bold" }}>Color: </span><span data-testid="selected-color">{selectedColor}</span>
                <div className="pd-color-options" data-testid="color-options">
                    {product['colors'].map((color, idx) =>
                        <div className={selectedColor === color ? "pd-color-option-selected" : "pd-color-option"} key={idx} onClick={() => {
                            setSelectedColor(color)
                        }
                        }>
                            <div className="pd-color" style={{ backgroundColor: color }}></div>
                        </div>
                    )}
                </div></>}
            {product['sizes'] && <><hr />
                <span style={{ fontWeight: "bold" }}>Size: </span><span data-testid="selected-size">{selectedSize}</span>
                <div className="pd-size-options" data-testid="size-options">
                    {product['sizes'].map((size, idx) =>
                        <div className={selectedSize === size ? "pd-color-option-selected" : "pd-color-option"} key={idx} onClick={() => {
                            setSelectedSize(size)
                        }
                        }>
                            {size}
                        </div>
                    )}
                </div></>}
        </div>
    );
}

export default ProductInformation;