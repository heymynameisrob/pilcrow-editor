import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: "/login" });
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <Outlet />;
}
