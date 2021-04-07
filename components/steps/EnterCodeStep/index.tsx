import React, { useState } from "react";
import clsx from "clsx";

import styles from "./EnterPhoneStep.module.scss";
import { StepInfo } from "../../StepInfo";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import Axios from "../../../core/Axios";
export const EnterCodeStep = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codes, setCodes] = useState([]);

  const nextDisabled = codes.some((v) => !v) || codes.length < 4;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.getAttribute("id")) - 1;
    const value = event.target.value;
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[id] = value;
      return newArr;
    });
    if (event.target.nextSibling) {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    await Axios.get("/todos");
    setIsLoading(false);
  };

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/numbers.png" title="Enter your activation code" />
      {isLoading ? (
        <>
          <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
            <div className={clsx("mb-30", styles.codeInput)}>
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="1"
                onChange={handleChangeInput}
                value={codes[0] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="2"
                onChange={handleChangeInput}
                value={codes[1] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="3"
                onChange={handleChangeInput}
                value={codes[2] || ""}
              />
              <input
                type="tel"
                placeholder="X"
                maxLength={1}
                id="4"
                onChange={handleChangeInput}
                value={codes[3] || ""}
              />
            </div>
            <Button onClick={onSubmit} disabled={nextDisabled}>
              Next
              <img className="d-ib ml-10" src="/static/arrow.png" />
            </Button>
          </WhiteBlock>
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  );
};
