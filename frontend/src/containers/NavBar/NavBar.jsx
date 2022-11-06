import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png'
import biglogo from '../../assets/big_logo.png'
import {AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import { BiGridAlt, BiStoreAlt} from 'react-icons/bi'
import {IoLocationOutline} from "react-icons/io5";
import {useRef} from "react";

const NavBar = () => {

    const textRef = useRef(null);
    const navigator = useNavigate();

    const searchFunc = () => {
        if(textRef.current.value !== undefined && textRef.current.value.length > 0) {
            navigator('/search?query='+textRef.current.value);
        }
    }

    return(
        <div className="Navbar">
            <div className="TNavbar">
                <Link to="/"><img className="navbar-logo" src={biglogo} alt="logo"/></Link>
                <span className="navbar-button">
                <BiStoreAlt /> Departments
                </span>
                    <span className="navbar-button">
                    <BiGridAlt /> Services
                </span>
                <div className="navbar-search-div">
                    <input ref={textRef} className="navbar-search-input" type="text" placeholder="Search everything at walmart online"/>
                    <button className="navbar-search-button" onClick={()=>{
                        searchFunc();
                    }}><AiOutlineSearch /></button>
                </div>
                <div className="navbar-button">
                    <AiOutlineHeart />
                    <div>
                        <span style={{fontSize: "small"}}>Reorder</span><br />
                        <span>My Items</span>
                    </div>
                </div>
                <div className="navbar-button">
                    <AiOutlineUser />
                    <div>
                        <span style={{fontSize: "small"}}>Sign In</span><br />
                        <span>Account</span>
                    </div>
                </div>
                <div style={{fontSize: "xx-large"}} className="navbar-button">
                    <AiOutlineShoppingCart />
                </div>
            </div>
            <div className="navbar-divider"></div>
            <div className="Secondary-Nav">
                <span>How do you want your items?</span>
                <span><IoLocationOutline />Pittsburgh, 15217</span>
            </div>
        </div>
    )

}

export default NavBar;