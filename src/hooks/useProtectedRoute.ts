import { useUserIsAuthenticated } from "@/contexts/ApplicationContext";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useAppDispatch } from "@/store/hooks";

const useProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useUserIsAuthenticated()!;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    } else {
      // Router.replace("/login");
      setLoading(false);
      return;
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeComplete", handleComplete);
    return () => {
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeComplete", handleComplete);
    };
  }, [Router, loading]);
  return {
    loading,
  };
};

export default useProtectedRoute;
