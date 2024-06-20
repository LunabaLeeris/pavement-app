'use server'

import { v4 as uuidv4 } from "uuid"
import { cookies } from 'next/headers'
import { query } from "./db"

export async function createSession(account_id, classification) {
    console.log("creating session...")
    try {
        // create a unique session ID
        const session_id = uuidv4()
        // insert the session inside the database
        const res = await query(`INSERT into session (session_id, account_id, classification)
                                values  ("${session_id}", ${account_id}, "${classification}");`)
        // store the session ID inside a cookie
        cookies().set('session_id', session_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        })

        return { error: "none" }
    }
    catch (err) {
        console.log(err)
        return { error: "session-error" }
    }
}

export async function checkSession() {
    console.log("checking session...")
    const session_id = cookies().get('session_id')?.value
    try {
        const res = await query("SELECT * from session where session_id = ?;", [session_id])

        if (res <= 0) return { error: "invalid-session" }
        else return { error: "none", user_data: { account_id: res[0].account_id, classification: res[0].classification } }
    }
    catch (err) {
        console.log(err)
        return { error: "checking-session-failed" }
    }
}

export async function dropSession() {
    console.log("dropping session")
    const session_id = cookies().get('session_id')?.value
    try {
        await query("DELETE from session where session_id = ?;", [session_id])
        console.log("success")
        return { error: "none" }
    }
    catch (err) {
        console.log(err)
        return { error: "dropping-session-failed" }
    }
}