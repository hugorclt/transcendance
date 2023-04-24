import React from "react";
import { ProfileLayout } from "../../layouts/ProfileLayout/ProfileLayout";
import { useParams } from "react-router";
import { nanoid } from "nanoid";

function ProfilePage(props) {
  let { username } = useParams();
  return <ProfileLayout username={username} />;
}

export default ProfilePage;
