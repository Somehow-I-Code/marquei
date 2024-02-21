"use client";

import BottomFloatingMenu from "./components/BottomFloatingMenu";
import CompanyLogo from "./components/CompanyLogo";
import ResourcesList from "./components/ResourcesList";
import Salute from "./components/Salute";
import { RESOURCES } from "./data";
import "./style.css";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between items-end px-6 py-12">
        <CompanyLogo />
        <Salute>Francisco</Salute>
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

      <section className="pb-28">
        <ResourcesList title="Categoria 1" list={RESOURCES} />
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
