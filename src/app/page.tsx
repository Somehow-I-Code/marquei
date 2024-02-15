"use client";
import Image from "next/image";
import imageLogoMarquei from "../app/LOGO_MARQUEI.jpeg";
import ResourcesList from "./components/ResourcesList";
import { RESOURCES } from "./data";
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

      <section className="resource-container">
        <h1 className="category-name">Categoria 1</h1>

        <ResourcesList list={RESOURCES} />
      </section>

      <section className="navigation-bar">
        <div>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" stroke="#33363F" strokeWidth="2" />
              <path
                d="M20 20L17 17"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div>
          <button>
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46.875 27C46.875 37.9767 37.9767 46.875 27 46.875C16.0233 46.875 7.125 37.9767 7.125 27C7.125 16.0233 16.0233 7.125 27 7.125C37.9767 7.125 46.875 16.0233 46.875 27ZM27 39.0417C26.4477 39.0417 26 38.594 26 38.0417V28H15.9583C15.406 28 14.9583 27.5523 14.9583 27C14.9583 26.4477 15.406 26 15.9583 26H26V15.9583C26 15.4061 26.4477 14.9583 27 14.9583C27.5523 14.9583 28 15.4061 28 15.9583V26H38.0417C38.594 26 39.0417 26.4477 39.0417 27C39.0417 27.5523 38.594 28 38.0417 28H28V38.0417C28 38.594 27.5523 39.0417 27 39.0417Z"
                fill="#0085FF"
                fillOpacity="0.92"
              />
            </svg>
          </button>
        </div>

        <div>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7H19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 12H19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 17H19"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
