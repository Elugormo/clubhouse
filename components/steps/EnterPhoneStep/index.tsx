import React, { useContext, useState } from "react";
import clsx from "clsx";

import styles from "./EnterPhoneStep.module.scss";
import { WhiteBlock } from "../../WhiteBlock";
import NumberFormat from "react-number-format";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";
import { MainContext } from "../../../pages";
import { Axios } from "../../../core/axios";

type InputValueState = {
  formattedValue: string;
  value: string;
};

export const EnterPhoneStep: React.FC = () => {
  const { onNextStep, setFieldValue } = useContext(MainContext);
  const [inputValue, setInputValue] = useState<InputValueState>(
    {} as InputValueState
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nextDisabled =
    !inputValue.formattedValue || inputValue.formattedValue.includes("_");

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await Axios.get(`/auth/sms?phone=${inputValue.value}`);
      setFieldValue("phone", inputValue.value);
      onNextStep();
    } catch (err) {
      console.warn("Error while sending SMS", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
        <div className={clsx("mb-30", styles.input)}>
          <img src="/static/ukrainian-flag.png" alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+## (###) ###-##-##"
            mask="_"
            placeholder="+38 (099) 333-22-11"
            value={inputValue.value}
            onValueChange={({ formattedValue, value }) =>
              setInputValue({ formattedValue, value })
            }
          />
        </div>
        <Button disabled={isLoading || nextDisabled} onClick={onSubmit}>
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              Next
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          )}
        </Button>
        <p className={clsx(styles.policyText, "mt-30")}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </div>
  );
};
