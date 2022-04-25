import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthMiddleware(props) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.authenticatedUser) {
      router.push("/");
    }
  }, [auth.authenticatedUser]);

  return <>{props.children}</>;
}
