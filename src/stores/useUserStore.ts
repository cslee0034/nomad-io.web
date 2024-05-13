import { create } from "zustand";

export type UserInfo = {
  id: string;
  email: string;
  provider: string;
  firstName: string;
  lastName: string;
};

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  setUserInfo: (userInfo: UserInfo) => void;
  logIn: () => void;
  logOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  isLoggedIn: false, // 초기값은 false
  setUserInfo: (userInfo) => set({ userInfo, isLoggedIn: true }), // 사용자 정보 설정 시 로그인 상태도 true로 변경
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ userInfo: null, isLoggedIn: false }),
}));
