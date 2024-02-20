"use client";
import Image from "next/image";
import resourcePlaceholder from "./assets/resource-placeholder.png";
import CompanyLogo from "./components/CompanyLogo";
import Salute from "./components/Salute";
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

                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L1 13.5"
                    stroke="#33363F"
                    strokeWidth="2"
                  />
                </svg>
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

                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L1 13.5"
                    stroke="#33363F"
                    strokeWidth="2"
                  />
                </svg>
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

                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L1 13.5"
                    stroke="#33363F"
                    strokeWidth="2"
                  />
                </svg>
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

                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L1 13.5"
                    stroke="#33363F"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </a>
          </li>
        </ul>
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
              <circle cx="11" cy="11" r="7" stroke="#33363F" stroke-width="2" />
              <path
                d="M20 20L17 17"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.875 27C46.875 37.9767 37.9767 46.875 27 46.875C16.0233 46.875 7.125 37.9767 7.125 27C7.125 16.0233 16.0233 7.125 27 7.125C37.9767 7.125 46.875 16.0233 46.875 27ZM27 39.0417C26.4477 39.0417 26 38.594 26 38.0417V28H15.9583C15.406 28 14.9583 27.5523 14.9583 27C14.9583 26.4477 15.406 26 15.9583 26H26V15.9583C26 15.4061 26.4477 14.9583 27 14.9583C27.5523 14.9583 28 15.4061 28 15.9583V26H38.0417C38.594 26 39.0417 26.4477 39.0417 27C39.0417 27.5523 38.594 28 38.0417 28H28V38.0417C28 38.594 27.5523 39.0417 27 39.0417Z"
                fill="#0085FF"
                fill-opacity="0.92"
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
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M5 12H19"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M5 17H19"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
