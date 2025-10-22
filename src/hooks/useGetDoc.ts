import { apiClient } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Doc } from "@/utils/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetDoc({
  userId,
  docId,
}: {
  userId: string;
  docId: number;
}) {
  return useSuspenseQuery({
    queryKey: [userId, "docs", docId],
    queryFn: async () => apiClient.get<Doc>(`docs/${docId}`),
  });
}
