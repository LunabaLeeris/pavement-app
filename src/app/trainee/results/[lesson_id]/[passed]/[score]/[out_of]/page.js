'use client'

import Button from "@/components/button"
import { useRouter } from "next/navigation"

export default function Page({ params }) {
    const router = useRouter()
    const status = params.passed == "true" ? "passed" : "fail"

    if (params.lesson_id == "null")
        return <h1>An error was encountered when the results were parsed</h1>

    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const results = (
        <div style={style}>
            <img src={"/" + status + ".svg"}></img>
            {status == "passed" ? <h2><span style={{ color: "#81BC06" }}>Congratulations</span> on passing!</h2> :
            <h2><span style={{ color: "#F35325" }}>Unfortunately</span> you failed!</h2>}
            <p>you scored {params.score} out of {params.out_of}</p>
        </div>
    )

    return (
        <div style={style}>
            {results}
            <div style={{display: "flex", gap: "34px", marginTop: "34px"}}>
                <Button bg_color="#174276" width="250px" fn={() => router.push(`/trainee/lesson/${params.lesson_id}`)} text={"Back to Lessons"}></Button>
                <Button bg_color="#F35325" width="250px" fn={() => router.back()} text={"Retake Exam"}></Button>
            </div>
        </div>
    )
}