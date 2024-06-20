import { checkSession } from "@/server/session"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Login from "./login"

export default async function Page() {
    const res = await checkSession()
    if (res.error == "none") redirect("/"+res.user_data.classification)     
    return <Login></Login>
}