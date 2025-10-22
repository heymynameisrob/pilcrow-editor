import { createFileRoute, redirect } from "@tanstack/react-router";
import { createDocSlugId } from "@/utils";
import { format } from "date-fns";
import { db } from "@/db";
import { document } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { getSession } from "@/lib/auth-server";

export const Route = createFileRoute("/_authenticated/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const session = await getSession(request);
          const [latestDoc] = await db
            .select()
            .from(document)
            .where(eq(document.userId, session.user.id))
            .orderBy(asc(document.updatedAt))
            .limit(1);

          if (!latestDoc) {
            const tempTitle = format(new Date(), "ddd MMM");
            const [newDoc] = await db
              .insert(document)
              .values({
                title: format(new Date(), "ddd MMM"),
                content: [],
                userId: session.user.id,
              })
              .returning();

            const slugId = createDocSlugId(newDoc.title, newDoc.id);

            // Redirect to the latest document
            throw redirect({
              to: "/d/$docId",
              params: { docId: slugId },
              replace: true,
            });
          }

          const slugId = createDocSlugId(latestDoc.title, latestDoc.id);

          // Redirect to the latest document
          throw redirect({
            to: "/d/$docId",
            params: { docId: slugId },
            replace: true,
          });
        } catch (error) {
          console.error("Error redirecting to document:", error);
          throw error;
        }
      },
    },
  },
});
