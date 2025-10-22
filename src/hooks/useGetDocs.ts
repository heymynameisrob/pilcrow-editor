import { apiClient } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetDocs(userId: string) {
  return useSuspenseQuery({
    queryKey: [userId, "docs"],
    queryFn: async () => apiClient.get<any>("docs"),
  });
}
