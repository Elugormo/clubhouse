import clsx from "clsx";
import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";
import { StepInfo } from "../../StepInfo";
import styles from "./EnterNameStep.module.scss";
import { MainContext } from "../../../pages";
import { useContext, useState } from "react";

export const EnterNameStep: React.FC = () => {
  const { onNextStep, userData, setFieldValue } = useContext(MainContext);
  const [inputValue, setInputValue] = useState<string>(userData.fullname);

  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickNextStep = () => {
    setFieldValue("fullname", inputValue);
    onNextStep();
  };

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/nameStepIcon.png"
        title="What's your full name?"
        description="People use real names on Clubhouse :) Thnx!"
      />
      <WhiteBlock className={clsx("m-auto", styles.whiteBlock)}>
        <div className="mb-30">
          <input
            onChange={handleChangeInput}
            value={inputValue}
            className="field"
            placeholder="Enter fullname"
          />
        </div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
