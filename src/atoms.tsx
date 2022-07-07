import { atom } from "recoil";

interface IBoardState {
  [key: string]: string[];
}

export const boardState = atom<IBoardState>({
  key: "class",
  default: {
    player: ["reece", "mason", "kai", "kante", "ben", "mattaus"],
    forward: ["messi"],
    midfielder: ["lampard"],
    defender: ["maldini"],
  },
});
