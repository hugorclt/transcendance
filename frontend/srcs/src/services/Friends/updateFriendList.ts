import { TFriend } from "../type";

export function updateFriendList(newFriend: TFriend, array: TFriend[]) {
  const index = array.findIndex(friend => friend.id === newFriend.id);
  if (index === -1) {
    return array;
  }
  const newArray = [...array];
  newArray[index] = newFriend;
  console.log(newArray);

  return newArray;
}