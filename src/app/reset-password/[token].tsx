// [token].tsx
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div>
      <p>{token}</p>
    </div>
  );
};

export default ResetPasswordPage;
