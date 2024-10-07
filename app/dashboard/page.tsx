import { auth } from "@/auth.ts"
import { db } from "@/db"
import { userProgress } from "@/db/schema"
import {SignOut} from "@/components/signout-button.tsx"
import { eq } from "drizzle-orm"
import { saveProgress } from "@/app/dashboard/actions.ts"

export default async function Home() {
  const session = await auth()
  if (!session?.user) return <div>nicht angemeldet</div>

  const progress = await db.select().from(userProgress).where(eq(userProgress.id, session.user.id!))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {session.user && (
      <div className="flex items-center gap-4 ">
        <img  src={session.user.image ?? ''} alt="User Avatar" className="w-12 h-12 rounded-full" />
        <span className="text-lg font-semibold">{session.user.name}</span>
        <SignOut />
        <form action={saveProgress}>
          <div>{ progress.length>0 && progress[0].progress}</div>
          <input type="number" name="progress" />
          <button type="submit">Save</button>
        </form>
      </div>
    )}
    </div>
  );
}
