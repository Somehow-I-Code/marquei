"use client";
import Image from "next/image";
import imageLogoMarquei from "../app/LOGO_MARQUEI.jpeg";
import "./style.css";

export default function Home() {
  return (
    <div>
      <header className="header">
        <Image src={imageLogoMarquei} alt="The logo Marquei" />
      </header>
      <span className="show">Nome</span>

      <ul className="listCategoria">
        <li>
          <button className="cat"> Categoria 1 </button>
        </li>
        <li>
          <button className="cat"> Categoria 2 </button>
        </li>
        <li>
          <button className="cat"> Categoria 3 </button>
        </li>
        <li>
          <button className="cat"> Categoria 4 </button>
        </li>
        <li>
          <button className="cat"> Categoria 5 </button>
        </li>
        <li>
          <button className="cat"> Categoria 6 </button>
        </li>
        <li>
          <button className="cat"> Categoria 7 </button>
        </li>
        <li>
          <button className="cat"> Categoria 8 </button>
        </li>
        <li>
          <button className="cat"> Categoria 9 </button>
        </li>
        <li>
          <button className="cat"> Categoria 10 </button>
        </li>
      </ul>
    </div>
  );
}
