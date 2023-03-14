export interface TUser {
    id: string,
    username: string,
    status: string,
    avatar: string,
    exp: number,
    balance: number,
}

export interface TFriend {
    id: string,
    username: string,
    status: string,
    avatar: string,
}

export interface TConversation {
    id: string,
    name: string,
    avatar: string,
    lastMessage: string,
    isDm: boolean,
    participants: TParticipant,
}

export interface TParticipant {
    id: string,
    name: string,
    role: string,
}