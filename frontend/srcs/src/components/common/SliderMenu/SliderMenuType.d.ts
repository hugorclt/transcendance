import {Dispatch, ReactNode, SetStateAction} from 'react'

export type TSliderMenuProps = {
    items: string[];
    setState: Dispatch<SetStateAction<string>>;
    state: string;
    flex: string;
}