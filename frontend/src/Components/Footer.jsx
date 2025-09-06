import React from 'react';
import { assets } from '../assets/assets';

const Footer = ({ text1, text2 }) => {
  return (
    <div>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            {text1 ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsam itaque ratione quaerat nisi assumenda velit, corrupti obcaecati sequi voluptas?"}
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92-123456788</li>
            <li>{text2 || "fuzion@gmail.com"}</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright FuZion © 2024 - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
