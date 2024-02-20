import { Karantina } from "next/font/google";

const karantina = Karantina({ subsets: ["latin"], weight: "400" });

export function CompanyLogo() {
  console.log(karantina.className);
  return (
    <h1 className={`text-6xl text-indigo-950 ${karantina.className}`}>
      Marquei
    </h1>
  );
}
