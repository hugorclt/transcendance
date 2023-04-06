import React, { useEffect, useRef, useState } from "react";
import { TSliderMenuProps } from "./SliderMenuType";
import { SliderBar, SliderBarContainer, SliderItems } from "./SliderMenu.style";
import { nanoid } from "nanoid";
import { COLORS } from "../../../colors";

function SliderMenu({ items, setState, state, flex }: TSliderMenuProps) {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const firstElemRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    setLeft(firstElemRef.current.offsetLeft);
    setWidth(firstElemRef.current.clientWidth);
  }, [firstElemRef]);

  const handleClick = (e: any, item: string) => {
    setState(item);
    setLeft(e.target.offsetLeft);
    setWidth(e.target.clientWidth);
  };

  return (
    <div>
      <SliderItems style={{ justifyContent: flex}}>
        {items.map((item) => {
          var color = COLORS.primary;

          if (state == item) {
            color = COLORS.secondary;
          }
          return (
            <button
              ref={state == item ? firstElemRef : null}
              style={{ color: color}}
              key={nanoid()}
              onClick={(e) => handleClick(e, item)}>
              <h4>{item}</h4>
            </button>
          );
        })}
      </SliderItems>
      <SliderBarContainer>
        <SliderBar style={{ width: width, left: left }} />
      </SliderBarContainer>
    </div>
  );
}

export default SliderMenu;
