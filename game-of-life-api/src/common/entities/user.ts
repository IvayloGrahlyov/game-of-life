export type User = {
  username: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  savedPresets?: boolean[][];
};
