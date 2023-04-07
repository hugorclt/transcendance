import { COLORS } from "../../colors";
import { IconBaseProps, IconContext } from "react-icons/lib";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function AddFriendIcon({ size, color }: IconBaseProps) {
  return (
    <IconContext.Provider value={{ color: color, size: String(size) }}>
      <div>
        <AiOutlineUsergroupAdd />
      </div>
    </IconContext.Provider>
  );
}
