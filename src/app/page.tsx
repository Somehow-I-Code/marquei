"use client";
import { LogoMarquei } from "./components/LogoMarquei";
import "./style.css";

export default function Home() {
  return (
    <main>
      <header className="page-header">
        <div className="header-image-container">
          <LogoMarquei />
        </div>

        <span className="header-user-tag">Nome</span>
      </header>
    </main>
  );
}
