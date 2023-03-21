export type TMessage = {
  senderId: string;
  content: string;
  roomId: string;
};

export interface TChatProps {
  chat: TConversation;
}
