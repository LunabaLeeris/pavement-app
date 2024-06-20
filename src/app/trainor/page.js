import { redirect } from "next/navigation"

export default async function Trainor() {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainor") redirect("/login")

    return (
        <>
            <h1>hello trainor</h1>
        </>
    )
}