import { COLORS } from "../../colors";
import { IconBaseProps, IconContext } from "react-icons/lib";
import { BsArrowDownUp } from "react-icons/bs";

export default function SwitchIcon({ size, color }: IconBaseProps) {
  return (
    <IconContext.Provider value={{ color: color, size: String(size) }}>
      <div>
        <BsArrowDownUp />
      </div>
    </IconContext.Provider>
  );
}
