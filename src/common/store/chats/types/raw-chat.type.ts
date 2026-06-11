import { ChatItemIndexDb } from '../../../types/chats/chat.type.ts';

export type RawChatType = {
    chats: Map<string, ChatItemIndexDb>;
    updatedChats: Map<string, ChatItemIndexDb>;
    indexDb: IDBDatabase | undefined;
    chatKeys: Map<string, CryptoKey>;
};
