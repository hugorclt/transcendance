export type TItemsProps = {
    name: string,
    desc: string,
    price: string,
    image: string,
    type: string,
    owned: boolean,
    setData: Dispatch<SetStateAction<TItemsProps[]>>,
}