import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    {
      id: "next-cookies",
      fetchPlugins: [
        {
          id: "add-cookies",
          name: "Add cookies from Next.js headers",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const headers = await cookies();
                ctx.headers.set("cookie", headers.toString());
              }
            },
          },
        },
      ],
    },
  ],
});