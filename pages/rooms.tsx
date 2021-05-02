import Link from "next/link";
import { Button } from "../components/Button";
import { ConversationCard } from "../components/ConversationCard";
import { Header } from "../components/Header";
import { Axios } from "../core/axios";
import Head from "next/head";
import { checkAuth } from "../utils/checkAuth";
import { Room } from "../api/RoomApi";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { StartRoomModal } from "../components/StartRoomModal";
import { Api } from "../api";
import { useSelector } from "react-redux";
import { selectRooms } from "../redux/selectors";
import { wrapper } from "../redux/store";
import { setRooms } from "../redux/slices/roomSlice";



const RoomPage: NextPage = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const rooms = useSelector(selectRooms);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <Header />
      <div className="container">
        <div className=" mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button onClick={() => setVisibleModal(true)} color="green">
            + Start room
          </Button>
        </div>
        {visibleModal && (
          <StartRoomModal onClose={() => setVisibleModal(false)} />
        )}
        <div className="grid mt-30">
          {rooms.map((obj) => (
            <Link key={obj.id} href={`/rooms/${obj.id}`}>
              <a className="d-flex">
                <ConversationCard
                  title={obj.title}
                  avatars={[]}
                  speakers={obj.speakers}
                  listenersCount={obj.listenersCount}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx) => {
    try {
      const user = await checkAuth(ctx);

      if (!user) {
        return {
          props: {},
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      const rooms = await Api(ctx).getRooms();

      ctx.store.dispatch(setRooms(rooms));

      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!");
      return {
        props: {
          rooms: [],
        },
      };
    }
  }
);

export default RoomPage;
