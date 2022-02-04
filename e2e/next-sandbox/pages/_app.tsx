import { createClient } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";
import { AppProps } from "next/app";

const client = createClient({
  authEndpoint: "/api/auth",
  liveblocksServer: process.env.LIVEBLOCKS_SERVER || "wss://liveblocks.net/v5",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiveblocksProvider client={client}>
      <Component {...pageProps} />
    </LiveblocksProvider>
  );
}
export default MyApp;
