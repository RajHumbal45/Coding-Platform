import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (isAuthenticated) {
      router.replace("/dashboard");
      return;
    }

    router.replace("/login");
  }, [isReady, isAuthenticated, router]);

  return null;
}
