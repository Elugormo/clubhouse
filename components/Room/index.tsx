import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { UserData } from "../../pages";
import { selectUserData } from "../../redux/selectors";
import { Button } from "../Button";
import { Speaker } from "../Speaker";

import styles from "./Room.module.scss";

interface RoomProps {
  title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
  const user = useSelector(selectUserData);
  const [users, setUsers] = useState<UserData[]>([]);

  const router = useRouter();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      socketRef.current = io("http://localhost:3001");

      socketRef.current.emit("CLIENT@ROOMS:JOIN", {
        user,
        roomId: router.query.id,
      });

      socketRef.current.on("SERVER@ROOMS:LEAVE", (user: UserData) => {
        setUsers((prev) => prev.filter((obj) => obj.id !== user.id));
      });

      socketRef.current.on("SERVER@ROOMS:JOIN", (allUsers) => {
        setUsers(allUsers);
      });
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div
          className={clsx("d-flex align-items-center", styles.actionButtons)}
        >
          <Link href="/rooms">
            <a>
              <Button color="gray" className={styles.leaveButton}>
                <img
                  width={18}
                  height={18}
                  src="/static/peace.png"
                  alt="Hand black"
                />
                Leave quietly
              </Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="users">
        {/* {isLoading && <div className="loader"></div>} */}
        {users.map((obj) => (
          <Speaker key={obj.fullname} {...obj} />
        ))}
      </div>
    </div>
  );
};
