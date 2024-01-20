"use client"
import "./style.css" //Style button

export default function Home() {
  return (
    <button onClick={function(){
      alert("Olá, mundo!")
    }}>
      Check
    </button>
  );
}
