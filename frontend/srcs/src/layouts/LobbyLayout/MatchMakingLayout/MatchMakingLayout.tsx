import React from "react";
import { MatchMakingContainer } from "./MatchMakingLayout.style";
import HeptaButton from "../../../components/common/Button/HeptaButton/HeptaButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError, AxiosResponse } from "axios";

function MatchMakingLayout() {
  const axiosPrivate = useAxiosPrivate();

  const cancel = () => {
    axiosPrivate
      .get("/lobbies/cancel")
      .then((response: AxiosResponse) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error.message));
      });
  };

  return (
    <MatchMakingContainer>
      <h3 className="loading">SEARCHING FOR A MATCH...</h3>
      <HeptaButton text="Cancel" width={140} onClick={cancel} />
    </MatchMakingContainer>
  );
}

export default MatchMakingLayout;
