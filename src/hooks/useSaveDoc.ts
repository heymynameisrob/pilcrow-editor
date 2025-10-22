import { apiClient } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JSONContent } from "@tiptap/core";

type SaveDocParams = {
  id: number;
  title?: string;
  content?: JSONContent;
};

type SaveDocResponse = {
  id: number;
  title: string;
  content: JSONContent;
};

/**
 * Hook to save a document (create or update)
 * - If id is provided, it updates the existing document (PUT /api/docs/$id)
 * - If id is not provided, it creates a new document (POST /api/docs)
 */
export function useSaveDoc(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, content }: SaveDocParams) => {
      if (id) {
        // Update existing document
        return apiClient.put<{ success: boolean }>(`docs/${id}`, {
          title,
          content,
        });
      } else {
        // Create new document
        return apiClient.post<SaveDocResponse>("docs", { title, content });
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate queries to refetch the updated data
      queryClient.invalidateQueries({
        queryKey: [userId, "docs"],
      });

      // If updating a specific document, invalidate that query too
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: [userId, "docs", variables.id],
        });
      }
    },
  });
}
