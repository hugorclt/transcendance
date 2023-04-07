import { COLORS } from "../../colors";
import { IconBaseProps, IconContext } from "react-icons/lib";
import { RxCrossCircled } from "react-icons/rx";

export default function CancelIcon({ size, color }: IconBaseProps) {
  return (
    <IconContext.Provider value={{ color: color, size: String(size) }}>
      <div>
        <RxCrossCircled />
      </div>
    </IconContext.Provider>
  );
}
