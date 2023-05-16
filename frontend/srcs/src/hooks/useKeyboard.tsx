import { MutableRefObject, useEffect, useRef } from "react";
import { SyntheticEvent } from "react-toastify/dist/utils";

export default function useKeyboard() {
  const keyMap = useRef<any>({});

  useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    const onBlur = (e: FocusEvent) => {
      keyMap.current['KeyA'] = e.type === undefined;
      keyMap.current['KeyW'] = e.type === undefined;
      keyMap.current['KeyS'] = e.type === undefined;
      keyMap.current['KeyD'] = e.type === undefined;
      keyMap.current['KeyR'] = e.type === undefined;

    }
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("blur", onBlur);
    document.addEventListener("keyup", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  });

  return keyMap.current;
}
