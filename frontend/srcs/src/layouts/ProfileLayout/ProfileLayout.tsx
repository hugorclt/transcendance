import React from "react";
import { ProfileLayoutContainer } from "./ProfileLayoutStyle.js";
import { Profile } from "../../components/Profile/Profile";
import { ProfileContainer } from "../../components/Profile/ProfileStyle.js";

export function ProfileLayout() {

    return (
	<ProfileLayoutContainer>
			<Profile/>
	</ProfileLayoutContainer>
    );
}