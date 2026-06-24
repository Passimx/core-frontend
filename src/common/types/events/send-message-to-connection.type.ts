import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

type SendEncryptedSeedPhraseType = {
    event: EventsEnum.SEND_ENCRYPTED_SEED_PHRASE;
    data: Partial<UserStateType>;
};

export type SendMessageToConnectionType = SendEncryptedSeedPhraseType;
