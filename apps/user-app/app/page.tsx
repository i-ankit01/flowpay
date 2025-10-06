import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import Appbar from "./components/Appbar";


export default function Page() {
  return (
    <div className="text-2xl">
      Hi Ankit
      <Appbar/>
    </div>
  );
}
