export type TMessage = {
  sender: string;
  message: string;
  roomName: string;
};

export interface TChatProps {
  chat: TConversation;
}
