import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";

export const useProfileAuthRedirect = (redirectIfAuth: boolean = true) => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.token !== null
  );

  useEffect(() => {
    if (
      (isAuthenticated && !redirectIfAuth) ||
      (!isAuthenticated && redirectIfAuth)
    ) {
      router.push(redirectIfAuth ? "/profile" : "/login");
    }
  }, [isAuthenticated]);
};
