export enum EventsEnum {
    SHOW_TEXT = 'show_text',
    CONNECT_NOTIFICATIONS = 'connect_notifications',
    SET_CONNECTION_RSA_PUBLIC_KEY_STRING = 'set_connection_public_key_string',
    ERROR = 'error',

    SET_STATE_APP = 'set_state_app',
    SET_STATE_USER = 'set_state_user',

    LOGOUT = 'logout',
    LOGIN = 'login',
    CREATE_USER = 'create_user',
    UPDATE_USER = 'update_user',
    GET_APPS = 'get_apps',

    RESEND_ASYNC_MESSAGE = 'resend_async_message',
    SEND_MESSAGE_TO_CONNECTION = 'send_message_to_connection',
    SEND_ENCRYPTED_SEED_PHRASE = 'send_encrypted_seed_phrase',

    GET_CONNECTION_RSA_PUBLIC_KEY_STRING = 'get_connection_rsa_public_key_string',

    PONG = 'pong',
    VERIFY = 'verify',
    SEND_MESSAGE = 'send_message',
    SEND_ASYNC_MESSAGE = 'send_async_message',
}
