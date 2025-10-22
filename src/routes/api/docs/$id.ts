import { createFileRoute } from "@tanstack/react-router";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth-server";
import { db } from "@/db";
import { document, note } from "@/db/schema";

export const Route = createFileRoute("/api/docs/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const session = await getSession(request);
          const { id: idParam } = params;
          const id = parseInt(idParam, 10);

          if (isNaN(id)) {
            return new Response(JSON.stringify({ error: "Invalid document ID" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Fetch the document
          const docs = await db
            .select()
            .from(document)
            .where(and(eq(document.id, id), eq(document.userId, session.user.id)))
            .limit(1);

          if (docs.length === 0) {
            return new Response(JSON.stringify({ error: "Document not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          const doc = docs[0];

          // Fetch notes for the document
          const docNotes = await db
            .select()
            .from(note)
            .where(eq(note.documentId, doc.id));

          const result = {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            created_at: doc.createdAt,
            last_updated_at: doc.updatedAt,
            notes: docNotes.map((n) => ({
              id: n.id,
              content: n.content,
              created_at: n.createdAt,
            })),
          };

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error fetching document:", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Failed to fetch document",
            }),
            {
              status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      PUT: async ({ request, params }) => {
        try {
          const session = await getSession(request);
          const { id: idParam } = params;
          const id = parseInt(idParam, 10);

          if (isNaN(id)) {
            return new Response(JSON.stringify({ error: "Invalid document ID" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const body = await request.json();

          const { title, content } = body;

          // Update the document
          const result = await db
            .update(document)
            .set({
              title,
              content,
              updatedAt: new Date(),
            })
            .where(and(eq(document.id, id), eq(document.userId, session.user.id)))
            .returning();

          if (result.length === 0) {
            return new Response(JSON.stringify({ error: "Document not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error updating document:", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Failed to update document",
            }),
            {
              status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      DELETE: async ({ request, params }) => {
        try {
          const session = await getSession(request);
          const { id: idParam } = params;
          const id = parseInt(idParam, 10);

          if (isNaN(id)) {
            return new Response(JSON.stringify({ error: "Invalid document ID" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Delete the document
          const result = await db
            .delete(document)
            .where(and(eq(document.id, id), eq(document.userId, session.user.id)))
            .returning();

          if (result.length === 0) {
            return new Response(JSON.stringify({ error: "Document not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error deleting document:", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Failed to delete document",
            }),
            {
              status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
