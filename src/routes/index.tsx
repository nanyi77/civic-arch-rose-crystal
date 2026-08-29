import { createFileRoute } from "@tanstack/react-router";
import { WindTunnelApp } from "@/components/wind-tunnel/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <WindTunnelApp />;
}
