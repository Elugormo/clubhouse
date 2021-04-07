import Head from "next/head";
import React, { createContext, useState } from "react";
import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { TwitterStep } from "../components/steps/TwitterStep";
import { ChooseAvatarStep } from "../components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "../components/steps/EnterPhoneStep";

const stepsComponent = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
};

type MainContextProps = {
  onNextStep: () => void;
  step: number;
};

export const MainContext = createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  const [step, setStep] = useState<number>(3);
  const Step = stepsComponent[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <MainContext.Provider value={{ step, onNextStep }}>
      <Step />
    </MainContext.Provider>
  );
}
