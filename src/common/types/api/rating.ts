export type RefInfoUserItemType = {
    id: string;
    count: number;
};

export type RatingUserType = {
    users: RefInfoUserItemType[];
    me: RefInfoUserItemType;
};
