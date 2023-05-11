import React, { useEffect, useState } from "react";
import { ProfileLayout } from "../../layouts/ProfileLayout/ProfileLayout";
import { useParams } from "react-router";
import { COLORS } from "../../colors";
import { ProfileContainer } from "../../components/Profile/ProfileStyle";

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
      <ProfileContainer>
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
      </ProfileContainer>
    </>
  );
}

export default ProfilePage;
