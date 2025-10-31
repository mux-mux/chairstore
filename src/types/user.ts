export type UserType = {
  uid: string;
  displayName: string;
  email: string;
};

export type UserState = {
  currentUser: UserType | null;
};

export type AdditionalInfo = { displayName?: string };
