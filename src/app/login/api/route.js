import { query, testConnection } from "@/server/db"
import { createSession } from "@/server/session"

export async function POST(req) {
    const mapping = { "trainee": 0, "trainor": 1 }
    const credentials = await req.json()
    await testConnection()
    const result = await query(`SELECT * from account where classification_id = ${mapping[credentials.classification]} 
                                AND email = "${credentials.email}" AND password = "${credentials.password}"`);
    var response = null

    if (result.length <= 0) response = { error: "login-error" }
    else {
        const session_res = await createSession(result[0].account_id, credentials.classification)
        response = session_res
    }

    return new Response(JSON.stringify(response))
}