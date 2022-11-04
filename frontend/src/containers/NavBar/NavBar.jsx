import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png'
import biglogo from '../../assets/big_logo.png'
import {AiOutlineShoppingCart} from "react-icons/ai";
import { BiGridAlt, BiStoreAlt} from 'react-icons/bi'
import {IoLocationOutline} from "react-icons/io5";

const NavBar = (props) => {

    return(
        <div className="Navbar">
            <div className="TNavbar">
                <img className="navbar-logo" src={biglogo} alt="logo"/>
                <span className="navbar-button">
                <BiStoreAlt /> Departments
                </span>
                    <span className="navbar-button">
                    <BiGridAlt /> Services
                </span>
                <input type="text" placeholder="Search everything at walmart online"/>
                <div className="navbar-button">
                    <span>Reorder</span><br />
                    <span>MyItems</span>
                </div>
                <div className="navbar-button">
                    <span>Sign In</span><br />
                    <span>Account</span>
                </div>
                <div className="navbar-cart">
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