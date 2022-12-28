import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {auth} from "../firebase";
import {User, onAuthStateChanged} from "@firebase/auth";
import {useEffect, useState} from "react";

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    })
  }, [setUser]);
  return isLoading;
}
export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
