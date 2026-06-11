type InnerChatItemType = {
    id: string;
};

export type ChatType = InnerChatItemType;

export type ChatItemIndexDb = ChatType & {
    key?: number;
};
