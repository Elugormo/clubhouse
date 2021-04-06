import clsx from "clsx";
import { Button } from "../../Button";
import { WhiteBlock } from "../../WhiteBlock";

import styles from "./TwitterStep.module.scss";

export const TwitterStep = () => {
  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/connect.png"
        title="Do you want import info from Twitter"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <b>IY</b>
          <svg></svg>
        </div>
        <h2 className="mb-40">Ivan Yanovych</h2>
        <Button>
          <img
            src="/static/twitter.svg"
            alt="Twitter logo"
            className={styles.twitterLogo}
          />
          Import from Twitter
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
        <div className="link mt-20 cup d-ib">Enter my info manually</div>
      </WhiteBlock>
    </div>
  );
};
