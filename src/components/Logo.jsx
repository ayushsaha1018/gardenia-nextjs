import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="text-3xl xs:text-4xl font-black text-primary">
      <Link href="/">Gardenia</Link>
    </div>
  );
};

export default Logo;
