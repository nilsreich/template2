import { auth } from "@/auth.ts"
import { SignIn } from "@/components/signin-button.tsx"

export default async function Home() {
    const session = await auth()
    if (!session?.user) return <SignIn />
    return (
        <>schon angemeldet</>
    );

}
