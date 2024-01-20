"use client"
import "./style.css"

export default function Home() {
  return (
    <button onClick={function(){
      alert("Olá mundo!")
    }}>
      Clique aqui!
    </button>
  );
}
