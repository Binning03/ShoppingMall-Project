import React, { useContext } from 'react';
import { Navbar as Nav, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

import { AuthContext } from '../../shared/context/auth-context';
import mainLogo from '../../shared/image/mainLogo.png';

const Navbar = () => {
  const auth = useContext(AuthContext);
  
  return (
    <Nav fluid rounded>
      <NavbarBrand href="/">
        <img src={mainLogo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Men's Fashion</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        {!auth.isLoggedIn && (
          <NavbarLink href="/signup">
            Signup
          </NavbarLink>
        )}
        {!auth.isLoggedIn && (
          <NavbarLink href="/login">Login</NavbarLink>
        )}
        {auth.isLoggedIn && (
          <NavbarLink href="/" onClick={auth.logout}>Logout</NavbarLink>
        )}
        <NavbarLink href={`/cart/${auth.userId}`}>Cart</NavbarLink>
        <NavbarLink href={`/user/${auth.userId}`}>MyPage</NavbarLink>
        {auth.isAdmin && (
          <NavbarLink href="/product/new">NewProduct</NavbarLink>
        )}
      </NavbarCollapse>
    </Nav>
  );
};

export default Navbar;