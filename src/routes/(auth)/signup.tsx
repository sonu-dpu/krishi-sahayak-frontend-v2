import { SignUp } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { FarmerImageGrid } from "@/components/auth/FarmerImageGrid";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FarmerImageGrid>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex justify-center">
          <SignUp forceRedirectUrl={"/onboard"} signInUrl="/signin" />
        </div>
      </div>
    </FarmerImageGrid>
  );
}
