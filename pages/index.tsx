import Head from "next/head";
import React, { useState } from "react";
import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { TwitterStep } from "../components/steps/TwitterStep";
const stepsComponent = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
};

export default function Home() {
  const [step, setStep] = useState<number>(2);
  const Step = stepsComponent[step];
  return (
    <div>
      <Step />
    </div>
  );
}
