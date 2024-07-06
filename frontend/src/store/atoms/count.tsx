export interface UserType {
  name: string;
  email: string;
}
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAtom = atom<UserType | null>({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
