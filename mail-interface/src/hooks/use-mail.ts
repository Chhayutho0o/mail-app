import { Email } from "@/types";
import { atom, useAtom } from "jotai";

type Config = {
  selected: Email | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useMail() {
  return useAtom(configAtom);
}
