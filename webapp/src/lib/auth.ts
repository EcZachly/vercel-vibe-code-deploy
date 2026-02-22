import { createSupabaseServerClient } from "./supabase/server";
import { prisma } from "./prisma";

export async function getAuthenticatedAuthor() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const author = await prisma.author.findUnique({
    where: { email: user.email! },
  });

  return author;
}

export async function requireAuthor() {
  const author = await getAuthenticatedAuthor();
  if (!author) {
    throw new Error("Unauthorized");
  }
  return author;
}
