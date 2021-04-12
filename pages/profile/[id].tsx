import { useRouter } from "next/router";
import React from "react";
import { Header } from "../../components/Header";
import { Profile } from "../../components/Profile";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <div className="container mt-30">
        <Profile
          avatarUrl="https://avatars.githubusercontent.com/u/53963530?v=4"
          fullname="Yanovych Ivan"
          username="elugormo"
          about="Some info"
        />
      </div>
    </>
  );
}
