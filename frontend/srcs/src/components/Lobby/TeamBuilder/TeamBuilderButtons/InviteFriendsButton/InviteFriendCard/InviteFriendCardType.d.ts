import { TFriend } from "../../../../services/type";

export interface TInviteFriendCardsProps {
  friend: TFriend;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style: any;
}
