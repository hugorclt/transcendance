import { TConversation } from "../../../../../../services/type";
import { TFriend } from "../../../../services/type";

export interface TInviteChatCardsProps {
  chat: TConversation;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style: any;
}
