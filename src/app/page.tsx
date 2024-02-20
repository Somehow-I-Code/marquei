"use client";

import Image from "next/image";
import imageLogoMarquei from "../app/LOGO_MARQUEI.jpeg";
import ResourcesList from "./components/ResourcesList";
import { RESOURCES } from "./data";
import BottomFloatingMenu from "./components/BottomFloatingMenu";
import "./style.css";

export default function Home() {
  return (
    <main>
      <header className="page-header">
        <div className="header-image-container">
          <Image src={imageLogoMarquei} alt="The logo Marquei" />
        </div>

        <span className="header-user-tag">Nome</span>
      </header>

      <nav>
        <ul className="list-categories">
          <li>
            <button className="category"> Categoria 1 </button>
          </li>
          <li>
            <button className="category"> Categoria 2 </button>
          </li>
          <li>
            <button className="category"> Categoria 3 </button>
          </li>
          <li>
            <button className="category"> Categoria 4 </button>
          </li>
          <li>
            <button className="category"> Categoria 5 </button>
          </li>
          <li>
            <button className="category"> Categoria 6 </button>
          </li>
          <li>
            <button className="category"> Categoria 7 </button>
          </li>
          <li>
            <button className="category"> Categoria 8 </button>
          </li>
          <li>
            <button className="category"> Categoria 9 </button>
          </li>
          <li>
            <button className="category"> Categoria 10 </button>
          </li>
        </ul>
      </nav>

      <section>
        <ResourcesList title="Categoria 1" list={RESOURCES} />
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
