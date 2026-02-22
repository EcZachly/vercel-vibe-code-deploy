import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/author";
  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const email = data.user.email!;
      const name =
        data.user.user_metadata?.full_name ||
        data.user.user_metadata?.name ||
        email.split("@")[0];

      await prisma.author.upsert({
        where: { email },
        update: { name },
        create: { email, name },
      });

      return response;
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
