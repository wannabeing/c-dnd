import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IPlayer {
  id: number;
  name: string;
}
interface IBoardState {
  [key: string]: IPlayer[];
}

// 로컬 스토리지 연결
const { persistAtom } = recoilPersist({
  key: "boardLocal",
  storage: localStorage,
});

export const boardState = atom<IBoardState>({
  key: "board",
  default: {
    forward: [{ id: Date.now() + 1, name: "drogba" }],
    midfielder: [{ id: Date.now() + 2, name: "lampard" }],
    defender: [{ id: Date.now() + 3, name: "silva" }],
  },
  effects_UNSTABLE: [persistAtom],
});
