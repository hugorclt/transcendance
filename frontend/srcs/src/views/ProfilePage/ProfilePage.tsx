import React, { useEffect, useState } from "react";
import { ProfileLayout } from "../../layouts/ProfileLayout/ProfileLayout";
import { useParams } from "react-router";
import { nanoid } from "nanoid";
import { COLORS } from "../../colors";

function ProfilePage(props) {
  const [user, setUsername] = useState<string | undefined>("");
  const [tempUsername, setTempUsername] = useState("");
  var { username } = useParams();

  useEffect(() => {
    setUsername(username);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(tempUsername);
    setTempUsername("");
  };

  return (
    <>
      <div style={{ padding: "8px", backgroundColor: COLORS.background }}>
        <form
          style={{ display: "flex", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <p style={{ marginRight: "8px" }}>Search user:</p>
          <input
            onChange={(e) => setTempUsername(e.target.value)}
            placeholder="Username"
          ></input>
        </form>
      </div>
      <ProfileLayout username={user} />
    </>
  );
}

export default ProfilePage;
