import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useState} from "react";
import NavBar from "./containers/NavBar/NavBar";
import Footer from "./containers/Footer/Footer";
import Home from "./containers/Home/Home";
import ProductDetails from "./containers/ProductDetails/ProductDetails";
import NotImplemented from "./containers/NotImplemented/NotImplemented";
import Search from "./containers/SearchResults/Search";

function App() {

  const [cart, setCart] = useState([]);

  return (
      <BrowserRouter>
        <div className='App'>
          <NavBar cart={cart} setCart={setCart} />
          <div className='MainContent'>
            <Routes>
              <Route exact path="/" element={<Home />}>

              </Route>
              <Route exact path="/product/:id" element={<ProductDetails />}>

              </Route>

              <Route exact path="/not-implemented" element={<NotImplemented />}>

              </Route>

              <Route exact path="/search" element={<Search />}>

              </Route>
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
