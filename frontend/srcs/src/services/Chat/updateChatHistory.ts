import { TConversation } from "../type";

export function updateChatHistory(
  array: TConversation[],
  newObj: TConversation
) {
  console.log(newObj);
  const index = array.findIndex((obj) => obj.id === newObj.id);
  if (index === -1) {
    return [newObj, ...array];
  } else {
    return array.map((obj, i) => (i === index ? { ...obj, ...newObj } : obj));
  }
}
