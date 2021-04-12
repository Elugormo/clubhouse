import React, { useState } from "react";
import clsx from "clsx";
import { StepInfo } from "../../StepInfo";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import Axios from "../../../core/axios";
import { useRouter } from "next/router";

import styles from "./EnterCodeStep.module.scss";
export const EnterCodeStep: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codes, setCodes] = useState(["", "", "", ""]);

  const nextDisabled = codes.some((v) => !v);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.getAttribute("id"));
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
    try {
      setIsLoading(true);
      await Axios.get("/todos");
      router.push("/rooms");
    } catch (err) {
      alert("Activation error");
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.block}>
      <StepInfo icon="/static/numbers.png" title="Enter your activation code" />
      {!isLoading ? (
        <>
          <WhiteBlock className={clsx("m-auto mt-30", styles.whiteBlock)}>
            <div className={clsx("mb-30", styles.codeInput)}>
              {codes.map((code, idx) => (
                <input
                  key={idx}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(idx)}
                  onChange={handleChangeInput}
                  value={code}
                />
              ))}
            </div>
            <Button onClick={onSubmit} disabled={nextDisabled}>
              Next
              <img className="d-ib ml-10" src="/static/arrow.svg" />
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
