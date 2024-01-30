"use client";
import Image from "next/image";
import imageLogoMarquei from "../app/LOGO_MARQUEI.jpeg";
import "./style.css";

export default function Home() {
  return (
    <div>
      <header>
        <Image src={imageLogoMarquei} alt="The logo Marquei" />
        <h2 className="show">Nome</h2>
      </header>
    </div>
  );
}
