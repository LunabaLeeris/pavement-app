'use client'

import { dropSession } from "@/server/session"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "@/server/action"
import Profile from "./profile"
import "@/styles/trainee.css"

export default async function Page() {
    const router = useRouter()

    const signOut = async () => {
        const res = await dropSession()
        if (res.error == "none") router.push("/login")
        else {
            // logout failed
        }
    }

    const { data: res, is_fetching } = useQuery({
        queryFn: () => getUserProfile(),
        queryKey: ["profile"]
    })

    if (is_fetching || !res) return <h1>Fetching programs...</h1>
    if (res.error != "none") {
        return <>
            <h1>Fetching failed...</h1>
            <h1>{res.error}</h1>
        </>
    }

    return (
        <>
            <Profile account={res.account} certificates={res.certificates} contacts={res.contacts} educations={res.educations} 
            experiences={res.experiences} programs={res.programs} signOut={signOut}></Profile>
        </>
    )
}