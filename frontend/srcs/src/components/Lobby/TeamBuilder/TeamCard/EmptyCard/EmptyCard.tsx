import React from "react";
import { EmptyCardContainer } from "./EmptyCard.style";
import UnavailableIcon from "../../../../../assets/icons/UnavailableIcon";
import MediaQuery from "react-responsive";
import { mediaSize } from "../../../../../mediaSize";
import { COLORS } from "../../../../../colors";

function EmptyCard() {
  return (
    <EmptyCardContainer>
      <MediaQuery maxWidth={mediaSize.tablet - 1}>
        <UnavailableIcon size={24} color={COLORS.darkergrey} />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.tablet} maxWidth={mediaSize.laptop - 1}>
        <UnavailableIcon size={32} color={COLORS.darkergrey} />
      </MediaQuery>
      <MediaQuery minWidth={mediaSize.laptop}>
        <UnavailableIcon size={48} color={COLORS.darkergrey} />
      </MediaQuery>
    </EmptyCardContainer>
  );
}

export default EmptyCard;
