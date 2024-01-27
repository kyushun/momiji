"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
      <Image src="/icon-rounded.png" alt="momiji" width={128} height={128} />

      <button
        className="rounded border px-4 py-2 transition-opacity hover:opacity-50"
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
