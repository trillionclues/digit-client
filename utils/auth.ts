import { RootState } from "@/redux/store/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthRedirect = (
  router: string[] | AppRouterInstance,
  isAuthenticated: unknown,
  redirectIfAuth: boolean = true
) => {
  useEffect(() => {
    if (
      (isAuthenticated && redirectIfAuth) ||
      (!isAuthenticated && !redirectIfAuth)
    ) {
      router.push(redirectIfAuth ? "/" : "/login");
    }
  }, [isAuthenticated]);
};
