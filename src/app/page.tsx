"use client";
import Image from "next/image";
import resourcePlaceholder from "./assets/resource-placeholder.png";
import "./style.css";

export default function Home() {
  return (
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
  );
}
