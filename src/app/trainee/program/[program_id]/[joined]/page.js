'use client'

import { fetchTraineeLessons, addCertificateLog, addUserToProgram} from "@/server/action"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Lesson from "./lesson_preview"
import { convert_to_date } from "@/lib/date_format"
import Button from "@/components/button"

export default function Page({ params }) {
    const joined = params.joined == "true"
    const program_id = params.program_id
    const router = useRouter()

    const { data: res, is_fetching } = useQuery({
        queryFn: () => fetchTraineeLessons(program_id),
        queryKey: ["lessons", { program_id }]
    })

    const { mutateAsync: addToCertificateLog } = useMutation({
        mutationFn: addCertificateLog
    })

    const { mutateAsync: addToProgram } = useMutation({
        mutationFn: addUserToProgram
    })

    if (is_fetching || !res) return <h1>Fetching lessons...</h1>
    if (res.error != "none") {
        return <>
            <h1>Fetching failed...</h1>
            <h1>{res.error}</h1>
        </>
    }

    const claimCertificate = async () => {
        const res = await addToCertificateLog(program_id)
        if (res.error != "none") {
            console.log(res.error)
            return res.error
        }

        router.push(`/trainee/award/${program_id}`)
    }

    const joinProgram = async () => {
        const res = await addToProgram(program_id)
        if (res.error != "none") {
            console.log(res.error)
            return res.error
        }
        
        router.push(`/trainee/program/${program_id}/true`)
    }

    const claimed = res.claimed.length > 0

    return (
        <div>
            <div>
                <h2>{res.program.name}</h2>
                <p style={{ marginBottom: "50px" }}>{res.program.description}</p>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <p><b>Date Created:</b> {convert_to_date(res.program.date_created)}</p>
                        <p><b>Trainors:</b> </p>
                        <p><b>Numer Of Trainees:</b> {res.program.number_of_trainees}</p>
                    </div>
                    <div style={{display: "flex", gap: "25px"}}>
                        {res.lessons.length == res.finished[0].total ? (
                            claimed ? <Button bg_color="#81BC06" text="Show Certificate" width="250px" fn={() => router.push(`/trainee/award/${program_id}`)}></Button>
                            : <Button bg_color="#81BC06" text="Claim Certificate" width="200px" fn={claimCertificate}></Button>) : ""}
                        
                        {!joined ? <Button bg_color="#174276" text="Request Join" width="200px" fn={joinProgram}></Button>: ""}
                    </div>
                </div>

                <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            </div>
            <div>
                {res.lessons.map((lesson, index) => <Lesson key={index} lesson_id={lesson.lesson_id} number={index}
                    prereqiusite_lesson_id={lesson.prereqiusite_lesson_id} name={lesson.name}
                    description={lesson.description} joined={joined} available={index <= res.finished[0].total}></Lesson>)}
            </div>
        </div>
    )
}