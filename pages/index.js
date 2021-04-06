import Head from "next/head";
import { WelcomeStep } from "../components/steps/WelcomeStep";

export default function Home() {
  return (
    <div>
      <WelcomeStep />
    </div>
  );
}
