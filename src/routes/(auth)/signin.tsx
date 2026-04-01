import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";
import { FarmerImageGrid } from "@/components/auth/FarmerImageGrid";

export const Route = createFileRoute("/(auth)/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FarmerImageGrid>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex justify-center">
          <SignIn signUpUrl="/signup" forceRedirectUrl="/app" />
        </div>
      </div>
    </FarmerImageGrid>
  );
}
