import { TConversation } from "../type";

export function updateChatHistory(
  array: TConversation[],
  newObj: TConversation,
  activeChat: TConversation,
) {
  const index = array.findIndex((obj) => obj.id === newObj.id);
  if (index === -1) {
    return [newObj, ...array];
  } else {
    console.log(array[index].id, activeChat.id)
    if (array[index].id == activeChat.id)
    {
      console.log("je suis active et readed")  
      array[index].isRead == true;
    }
    return array.map((obj, i) => (i === index ? { ...obj, ...newObj } : obj));
  }
}
