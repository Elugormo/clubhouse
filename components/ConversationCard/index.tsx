import React from "react";

import styles from "./ConversationCard.module.scss";
import whiteBlockStyles from "../WhiteBlock/WhiteBlock.module.scss";
import clsx from "clsx";
import { Avatar } from "../Avatar";

interface ConversationCardProps {
  title: string;
  speakers: string[];
  avatars: string[];
  listenersCount: number;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  speakers = [],
  avatars = [],
  listenersCount,
}) => {
  console.log(speakers);

  return (
    <div className={clsx(whiteBlockStyles.block, styles.card, "mb-30")}>
      <h4 className={styles.title}>{title}</h4>
      <div className={clsx("d-flex mt-10", styles.content)}>
        <div className={styles.avatars}>
          {avatars.map((url, i) => (
            <Avatar
              key={url}
              width="45px"
              height="45px"
              src={url}
              className={
                avatars.length > 1 && i === avatars.length - 1
                  ? "lastAvatar"
                  : ""
              }
            />
          ))}
        </div>
        <div className={clsx(styles.info, "ml-10")}>
          <ul className={styles.users}>
            {speakers.map((name, i) => (
              <li key={name + i}>
                {name}{" "}
                <img
                  src="/static/cloud.png"
                  alt="Cloud"
                  width={14}
                  height={14}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.details}>
            <li>
              <img
                src="/static/user.svg"
                alt="Users count"
                width={12}
                height={12}
              />
              {listenersCount}
            </li>

            <li>
              <img
                className="ml-5"
                src="/static/message.svg"
                alt="Users count"
                width={12}
                height={12}
              />
              {speakers.length}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
