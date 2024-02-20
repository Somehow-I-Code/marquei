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

      <section className="flex flex-col gap-6 mx-6">
        <h1 className="text-slate-800 text-3xl font-bold">Categoria 1</h1>

        <ResourcesList list={RESOURCES} />
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
