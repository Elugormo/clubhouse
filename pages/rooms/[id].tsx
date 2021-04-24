import { redirect } from "next/dist/next-server/server/api-utils";
import React from "react";
import { Api } from "../../api";
import { BackButton } from "../../components/BackButton";
import { Header } from "../../components/Header";
import { Room } from "../../components/Room";
import { Axios } from "../../core/axios";
export default function RoomPage({ room }) {
  return (
    <>
      <Header />
      <div className="container mt-40">
        <BackButton title="All rooms" href="/rooms" />
      </div>
      <Room title={room.title} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const roomId = ctx.query.id;
    const room = await Api(ctx).getRoom(roomId);
    return {
      props: {
        room,
      },
    };
  } catch (error) {
    console.log("ERROR!");
    return {
      props: {},
      redirect: {
        destination: "/rooms",
        permanent: false,
      },
    };
  }
};
