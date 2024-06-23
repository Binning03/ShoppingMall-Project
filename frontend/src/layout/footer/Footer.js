import React from 'react';
import { Footer as Foot, FooterBrand, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";

import mainLogo from '../../shared/image/mainLogo.png';

const Footer = () => {
  return (
    <div className="mt-48">
      <Foot className="fixed bottom-0" container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterBrand
              href="/"
              src={mainLogo}
              alt="Logo"
              name="Men's Fashion"
            />
            <FooterLinkGroup>
              <FooterLink href="/">About</FooterLink>
              <FooterLink href="/">Privacy Policy</FooterLink>
              <FooterLink href="/">Licensing</FooterLink>
              <FooterLink href="/">Contact</FooterLink>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <h5 className="text-gray-500 dark:text-gray-400">쇼핑몰 구현 프로젝트</h5>
        </div>
      </Foot>
    </div>
  );
};

export default Footer;