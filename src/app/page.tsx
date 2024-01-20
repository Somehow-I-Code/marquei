"use client"
import "./style.css"
export default function Home() {
  return (
    <button onClick={function(){
      alert("Olá, mundo!")
    }}>
      <p>Check</p>
    </button>
  );
}
