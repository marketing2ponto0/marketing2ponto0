import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    
    // Log detailed error to server console
    console.error("Critical server error caught in middleware:", error);
    
    // Provide a slightly more helpful response in development if possible
    const message = error instanceof Error ? error.message : "Unknown error";
    const stack = error instanceof Error ? error.stack : "";

    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Server Error</title></head>
        <body style="font-family: sans-serif; padding: 2rem; background: #fff1f2; color: #9f1239;">
          <h1>Server Error (500)</h1>
          <p><strong>Message:</strong> ${message}</p>
          <pre style="background: #fff; padding: 1rem; border: 1px solid #fda4af; border-radius: 4px; overflow: auto;">${stack}</pre>
          <hr/>
          <button onclick="location.reload()">Reload Page</button>
        </body>
      </html>`,
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware],
}));
