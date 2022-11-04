import {Link} from "react-router-dom";
import {AiFillStar, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";

const ProductList = (props) => {

    const products = props.products;

    return (
        <div className="item-wrapper">
            {products.map((product, idx) =>
                <Link to={"/product/" + product['id']} key={idx}>
                    <div className="item">
                        <img className="item-image" alt="product" src={product['images'][0]}/>
                        <span className="item-price">${product['price']}</span><br />
                        {product['old_price'] !== undefined && <span className="item-old-price">${product['old_price']}<br /></span>}
                        <span className="item-name">{product['name']}</span>
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

                        </div>
                        <button className="item-add-btn"><AiOutlinePlus />Add</button>
                    </div></Link>)}
        </div>
    );

}

export default ProductList;