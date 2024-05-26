import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import dayjs from "dayjs";

/**
 * 유저가 재접속 했을 경우 expireDate를 기반으로 토큰을 갱신한다.
 */
export const useWindowRefresh = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const expireDate = isBrowser ? localStorage.getItem("expireDate") : null;
    const isExpired = !expireDate || dayjs() >= dayjs(expireDate);

    /**
     * 1. window 객체가 없는 경우 브라우저 환경이 아니므로 함수를 종료한다.
     * 2. userInfo가 있다면 다시 로그인할 필요가 없으므로 함수를 종료한다.
     * 3. expireDate가 없거나 만료되었다면 함수를 종료한다.
     */
    if (!isBrowser || userInfo || isExpired) {
      return;
    }

    const refresh = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());

        if (response.expiresIn) {
          const expireDate = dayjs()
            .add(response.expiresIn, "second")
            .toString();
          localStorage.setItem("expireDate", expireDate);
        }

        setUserInfo({
          id: response.id,
          email: response.email,
          provider: response.provider,
          firstName: response.firstName,
          lastName: response.lastName,
        });
      } catch (error) {
        localStorage.removeItem("expireDate");
        console.error("Error refreshing auth token:", error);
      }
    };

    refresh();
  }, []);
};
