import { COLORS } from "../../colors";
import { IconBaseProps, IconContext } from "react-icons/lib";
import { IoMdAddCircle } from "react-icons/io";

export default function AddIcon({ size, color }: IconBaseProps) {
  return (
    <IconContext.Provider value={{ color: color, size: String(size) }}>
      <div>
        <IoMdAddCircle />
      </div>
    </IconContext.Provider>
  );
}
