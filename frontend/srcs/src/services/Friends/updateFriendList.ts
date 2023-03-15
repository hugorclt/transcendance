import { TFriend } from "../type";

export function updateFriendList(newFriend: TFriend, array: TFriend[]) {
  console.log(array);
  const index = array.findIndex((friend) => friend.id === newFriend.id);
  if (index === -1) {
    return [newFriend, ...array];
  } else {
    const newArray = [...array];
    newArray[index] = newFriend;
    console.log(newArray);
    return newArray;
  }
}
