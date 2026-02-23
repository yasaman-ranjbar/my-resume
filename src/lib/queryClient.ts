import { QueryClient } from "@tanstack/react-query";

// Create a client instance
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Important for SSR: prevents immediate background refetch on client
        staleTime: 1000 * 60, // 1 minute – adjust to your needs
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // server side: create a new client per request
    return makeQueryClient();
  }
  
  // client side
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  
  return browserQueryClient;
}
