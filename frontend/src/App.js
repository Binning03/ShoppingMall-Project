import React, { useState, useCallback, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';

import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';

const Cart = React.lazy(() => import('./pages/cart/Cart'));
const Category = React.lazy(() => import('./pages/category/Category'));
const EditProduct = React.lazy(() => import('./pages/editProduct/EditProduct'));
const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Mypage = React.lazy(() => import('./pages/mypage/Mypage'));
const NewProduct = React.lazy(() => import('./pages/newProduct/NewProduct'));
const Product = React.lazy(() => import('./pages/product/Product'));
const Signup = React.lazy(() => import('./pages/signup/Signup'));
const MyReview = React.lazy(() => import('./pages/mypage/MyReview'));
const EditUser = React.lazy(() => import('./pages/mypage/EditUser'));
const MyHistory = React.lazy(() => import('./pages/mypage/MyHistory'));

function App() {
  const getLoginData = () => {
    const data = JSON.parse(localStorage.getItem("login"));
    if(!data) return false;
    return data;
  };
  
  const getAdminData = () => {
    const data = JSON.parse(localStorage.getItem("admin"));
    if(!data) return false;
    return data;
  };
  
  const getUserId = () => {
    const data = JSON.parse(localStorage.getItem("userId"));
    if(!data) return "";
    return data;
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(getLoginData);
  const [isAdmin, setIsAdmin] = useState(getAdminData);
  const [userId, setUserId] = useState(getUserId);
  
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    window.location.href = "/";
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId("");
    window.location.href = "/";
  }, []);
  
  const switchAdmin = useCallback(() => {
    setIsAdmin(true);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(isAdmin));
  }, [isAdmin]);
  
  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);
  
  let routes;

  if (isLoggedIn) {
    if(isAdmin) {
      routes = (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/category/:cid" element={<Category />}></Route>
          <Route path="/product/:pid" element={<Product />}></Route>
          <Route path="/user/:uid" element={<Mypage />}></Route>
          <Route path="/review/:uid" element={<MyReview />}></Route>
          <Route path="/history/:uid" element={<MyHistory />}></Route>
          <Route path="/edit/:uid" element={<EditUser />}></Route>
          <Route path="/cart/:uid" element={<Cart />}></Route>
          <Route path="/product/new" element={<NewProduct />}></Route>
          <Route path="/product/edit/:pid" element={<EditProduct />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    }
    else {
      routes = (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/category/:cid" element={<Category />}></Route>
          <Route path="/product/:pid" element={<Product />}></Route>
          <Route path="/user/:uid" element={<Mypage />}></Route>
          <Route path="/review/:uid" element={<MyReview />}></Route>
          <Route path="/history/:uid" element={<MyHistory />}></Route>
          <Route path="/edit/:uid" element={<EditUser />}></Route>
          <Route path="/cart/:uid" element={<Cart />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/category/:cid" element={<Category />}></Route>
        <Route path="/product/:pid" element={<Product />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  
  /*
  routes = (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/category/:cid" element={<Category />}></Route>
      <Route path="/product/new" element={<NewProduct />}></Route>
      <Route path="/product/edit/:pid" element={<EditProduct />}></Route>
      <Route path="/product/:pid" element={<Product />}></Route>
      <Route path="/user/:uid" element={<Mypage />}></Route>
      <Route path="/review/:uid" element={<MyReview />}></Route>
      <Route path="/history/:uid" element={<MyHistory />}></Route>
      <Route path="/edit/:uid" element={<EditUser />}></Route>
      <Route path="/cart/:uid" element={<Cart />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
  */
  
  return (
    <AuthContext.Provider
      value={{ userId: userId, isLoggedIn: isLoggedIn, login: login, logout: logout, isAdmin: isAdmin, switchAdmin: switchAdmin }}
    >
      <Router>
        <Navbar />
        <main className="mb-28 mt-4"><Suspense>{routes}</Suspense></main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
