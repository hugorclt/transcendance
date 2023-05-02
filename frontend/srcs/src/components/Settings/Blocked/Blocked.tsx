import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { COLORS } from "../../../colors";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BlockedCards, BlockedList } from "./Blocked.style";


const Blocked = () => {
  const [blocked, setBlocked] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("users/blocked")
      .then((res: AxiosResponse) => {
        setBlocked(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErrMsg("Error while fetching blocked user");
      });
  }, []);

  const handleUnblock = (username: string) => {
    axiosPrivate.post("/users/unblock", {
      username: username
    }).then((res: AxiosResponse) => {
      setBlocked((prev) => prev.filter((user) => user != username))
    })
  }

  return (
    <BlockedList>
      {blocked.map((block) => {
        return (
          <BlockedCards>
            <h4>{block}</h4>
            <RxCross2 onClick={() => handleUnblock(block)} style={{cursor: "pointer"}} color={COLORS.secondary} size={32} />
          </BlockedCards>
        );
      })}
      {errMsg.length > 0 ? <p>{errMsg}</p> : <></>}
    </BlockedList>
  );
};

export default Blocked;
