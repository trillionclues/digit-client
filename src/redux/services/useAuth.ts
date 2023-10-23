import { parse } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAuth = (req: IncomingMessage, res: ServerResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token || "";
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );
  return { isAuthenticated, token };
};
