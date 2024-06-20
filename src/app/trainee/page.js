import { redirect } from "next/navigation"
import { checkSession } from "@/server/session"

export default async function Page() {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") redirect("/login")
    redirect(`/trainee/programs/${true}`)
}