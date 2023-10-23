import { RootState } from "@/redux/store/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.token !== null
  );
  const router = useRouter();

  // Check if authenticated
  if (!isAuthenticated) {
    router.push("/dashboard");
    return null; // Prevents rendering the component
  }
  return WrappedComponent;
};

export default withAuth;
