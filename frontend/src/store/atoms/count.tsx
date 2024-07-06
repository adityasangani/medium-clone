export interface UserType {
  name: string;
  email: string;
}
import { atom } from "recoil";

export const userAtom = atom<UserType | null>({
  key: "userAtom",
  default: null,
});
