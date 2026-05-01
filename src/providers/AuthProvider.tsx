import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient";
import { isAxiosError } from "axios";
import { Sprout } from "lucide-react";

type UserData = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  address: string;
  profileImage?: string;
  role: "farmer" | "officer" | string;
};

type AuthContextType = {
  user: UserData | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

const PUBLIC_ROUTES = ["/signin", "/signup", "/"];
const AUTH_ONLY_RESTRICTED_ROUTES = ["/signin", "/signup", "/onboard", "/"];

const isFarmerRoute = (path: string) =>
  path.startsWith("/chat") ||
  path.startsWith("/c/") ||
  path.startsWith("/app") ||
  path.startsWith("/chat-live");

const isOfficerRoute = (path: string) =>
  path.startsWith("/dashboard") || path.startsWith("/officer");

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded: isClerkLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();

  const {
    data: user = null,
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    queryKey: ["user", isSignedIn],
    queryFn: async () => {
      if (!isSignedIn) return null;
      const token = await getToken();
      if (!token) return null;

      const response = await apiClient.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data as UserData;
    },
    enabled: isClerkLoaded,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: (failureCount, err) => {
      if (isAxiosError(err) && err.response?.status === 404) {
        return false; // Do not retry if onboarding profile is missing
      }
      return failureCount < 2;
    },
  });

  const isLoading = !isClerkLoaded || isQueryLoading;

  useEffect(() => {
    if (!isClerkLoaded) return;

    const currentPath = location.pathname;

    // 1. Not signed in
    if (!isSignedIn) {
      if (!PUBLIC_ROUTES.includes(currentPath)) {
        navigate({ to: "/signin" });
      }
      return;
    }

    // 2. Signed in, but profile not found (404) - Onboarding not completed
    if (error && isAxiosError(error) && error.response?.status === 404) {
      if (currentPath !== "/onboard" && !PUBLIC_ROUTES.includes(currentPath)) {
        navigate({ to: "/onboard" });
      }
      return;
    }

    // 3. Loading user data - Wait for it before doing role-based checks
    if (isQueryLoading) return;

    // 4. Signed in and profile exists
    if (user) {
      if (user.role === "farmer") {
        if (
          AUTH_ONLY_RESTRICTED_ROUTES.includes(currentPath) ||
          isOfficerRoute(currentPath)
        ) {
          console.log(
            `Restricting farmer from ${currentPath}, redirecting to /app`,
          );
          navigate({ to: "/app" });
        }
      } else if (user.role === "officer") {
        if (
          AUTH_ONLY_RESTRICTED_ROUTES.includes(currentPath) ||
          isFarmerRoute(currentPath)
        ) {
          console.log(
            `Restricting officer from ${currentPath}, redirecting to /dashboard`,
          );
          navigate({ to: "/dashboard" });
        }
      }
    }
  }, [
    isClerkLoaded,
    isSignedIn,
    user,
    error,
    navigate,
    location.pathname,
    isQueryLoading,
  ]);

  if (isLoading && !PUBLIC_ROUTES.includes(window.location.pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative bg-background p-5 rounded-full border-2 border-primary/10 shadow-2xl">
              <Sprout className="size-12 text-primary animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-bold tracking-tight text-foreground">
              Krishi Sahayak
            </p>
            <p className="text-sm font-medium text-muted-foreground animate-pulse">
              Cultivating your experience...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppAuth must be used within an AuthProvider");
  }
  return context;
};
