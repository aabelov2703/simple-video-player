import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 w-full flex items-center px-4 py-2 border-t border-gray-500">
      <div className="flex-1">
        <Image
          src="/images/FULL_LOGO_COLOR.png"
          alt="Logo"
          width={120}
          height={33}
        />
      </div>
    </footer>
  );
};

export default Footer;
