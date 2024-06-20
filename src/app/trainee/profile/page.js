'use client'

import Button from "@/components/button"
import { dropSession } from "@/server/session"
import { useRouter } from "next/navigation"
import "@/styles/trainee.css"

export default async function Profile() {
    const router = useRouter()

    const sign_out = async () => {
        const res = await dropSession()
        if (res.error == "none") router.push("/login")
        else {
            // logout failed
        }
    }

    return (
        <>
            <span className="page">Profile</span>
            <div>
                <Button bg_color="#F35325" text="Sign Out" width="250px" fn={sign_out}></Button>
            </div>

        </>
    )
}