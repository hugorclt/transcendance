import { TConversation, TUser } from "../type";

export function displayName(conversation: TConversation, user: TUser) {
  if (conversation.isDm) {
    if (conversation.participants[0].name == user.username)
      return conversation.participants[1].name;
    else return conversation.participants[0].name;
  }
  return conversation.name;
}
