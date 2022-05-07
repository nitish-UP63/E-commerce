import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

import Footer from "./component/layout/Footer/Footer.js";
import Header from "./component/layout/Header/Header.js";
import Home from "./component/Home/Home.js";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";

import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/user/LoginSignUp";

import store from "./store";
import { loadUser } from "./actions/userAction";

import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";

import Profile from "./component/user/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute"

import UpdateProfile from "./component/user/UpdateProfile"
import UpdatePassword from "./component/user/UpdatePassword.js"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <Route exact path="/login" component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
