"use client"
import "./styles.css"
export default function Home() {
  return (
    <div>
      <button onClick={function(){
        alert("Olá Mundo")
      }}>Primeiro botão</button>
    </div>
  );
}
