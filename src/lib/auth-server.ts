import { auth } from "@/lib/auth";

export async function getSession(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    console.log(req);
    throw new Error("Unauthorized");
  }

  return session;
}
