import logo from '../../assets/logo.png'
import './NotImplemented.css'

const NotImplementedPage = () => {
    return (
        <div id="not-implemented-div">
            <img src={logo} id="not-implemented-image" />
            <p id="not-implemented-p">Oops, this page doesn't exist yet... how about a product from the last page?</p>
        </div>
    );
};

export default NotImplementedPage;