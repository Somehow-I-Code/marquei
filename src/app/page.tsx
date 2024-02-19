"use client";
import {
  ChevronRightIcon,
} from "@/components/Icons";
import Image from "next/image";
import imageLogoMarquei from "../app/LOGO_MARQUEI.jpeg";
import resourcePlaceholder from "./assets/resource-placeholder.png";
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

      <section className="resource-container">
        <h1 className="category-name">Categoria 1</h1>

        <ul className="resource-item-list">
          <li>
            <a className="resource-item-link">
              <div className="resource-item-image">
                <Image
                  src={resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="resource-item-info-container">
                <div className="resource-item-info">
                  <h2 className="resource-item-name">Resource #1</h2>

                  <p className="resource-item-description">
                    Here we have some text helping describe that resource
                  </p>
                </div>

                <div className="min-w-3">
                  <ChevronRightIcon />
                </div>
              </div>
            </a>
          </li>

          <li>
            <a className="resource-item-link">
              <div className="resource-item-image">
                <Image
                  src={resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="resource-item-info-container">
                <div className="resource-item-info">
                  <h2 className="resource-item-name">Resource #2</h2>

                  <p className="resource-item-description">
                    Here we have some text helping describe that resource
                  </p>
                </div>

                <div className="min-w-3">
                  <ChevronRightIcon />
                </div>
              </div>
            </a>
          </li>

          <li>
            <a className="resource-item-link">
              <div className="resource-item-image">
                <Image
                  src={resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="resource-item-info-container">
                <div className="resource-item-info">
                  <h2 className="resource-item-name">Resource #3</h2>

                  <p className="resource-item-description">
                    Here we have some text helping describe that resource
                  </p>
                </div>

                <div className="min-w-3">
                  <ChevronRightIcon />
                </div>
              </div>
            </a>
          </li>

          <li>
            <a className="resource-item-link">
              <div className="resource-item-image">
                <Image
                  src={resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="resource-item-info-container">
                <div className="resource-item-info">
                  <h2 className="resource-item-name">Resource #4</h2>

                  <p className="resource-item-description">
                    Here we have some text helping describe that resource
                  </p>
                </div>

                <div className="min-w-3">
                  <ChevronRightIcon />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
