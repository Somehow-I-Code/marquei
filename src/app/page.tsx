"use client"
import "./styles.css"

export default function Home() {
  return (
      <button onClick={function(){
        alert("Olá Mundo")
      }}>Primeiro botão</button>
  );
}
