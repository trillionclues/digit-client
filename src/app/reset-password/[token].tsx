// [token].tsx
import React from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <></>;
};

export default ResetPasswordPage;
