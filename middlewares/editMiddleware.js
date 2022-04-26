import React from "react";
import { useSelector } from "react-redux";

export default function editMiddleware() {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
  
    useEffect(() => {
      if (auth.authenticatedUser) {
        router.push("/profile");
      }
    }, [auth.authenticatedUser]);
  
    return <>{props.children}</>;
}
