import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth-server";
import { db } from "@/db";
import { document, note } from "@/db/schema";

export const Route = createFileRoute("/api/docs/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const session = await getSession(request);

          // Fetch all documents for the authenticated user
          const docs = await db
            .select()
            .from(document)
            .where(eq(document.userId, session.user.id));

          // Fetch notes for each document
          const docsWithNotes = await Promise.all(
            docs.map(async (doc) => {
              const docNotes = await db
                .select()
                .from(note)
                .where(eq(note.documentId, doc.id));

              return {
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
            })
          );

          return new Response(JSON.stringify(docsWithNotes), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error fetching documents:", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Failed to fetch documents",
            }),
            {
              status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const session = await getSession(request);
          const body = await request.json();

          const { title, content } = body;

          // Insert new document (ID is auto-generated)
          const result = await db.insert(document).values({
            title,
            content,
            userId: session.user.id,
          }).returning();

          const newDoc = result[0];

          return new Response(
            JSON.stringify({ id: newDoc.id, title: newDoc.title, content: newDoc.content }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          console.error("Error creating document:", error);
          return new Response(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Failed to create document",
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
