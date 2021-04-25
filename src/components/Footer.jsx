import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();

  return (
    <footer>
      <p>
        Copyright &copy; {date.getFullYear()}. All rights reserved. Design by
        Emmanuel Adebayo&trade;
      </p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
