import { IconBaseProps, IconContext } from "react-icons/lib";
import { CgUnavailable } from "react-icons/cg";
export default function UnavailableIcon({ size, color }: IconBaseProps) {
  return (
    <IconContext.Provider value={{ color: color, size: String(size) }}>
      <div>
        <CgUnavailable />
      </div>
    </IconContext.Provider>
  );
}
