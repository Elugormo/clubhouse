import clsx from "clsx";
import Link from "next/link";
import React from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { Speaker, SpeakerProps } from "../Speaker";

import styles from "./Room.module.scss";
import { selectUserData } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { UserData } from "../../pages";

interface RoomProps {
  title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
  const user = useSelector(selectUserData);
  const [users, setUsers] = React.useState<UserData[]>([]);

  const router = useRouter();
  const socketRef = React.useRef<Socket>();

  React.useEffect(() => {
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

      // setUsers((prev) => [...prev, user]);
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
