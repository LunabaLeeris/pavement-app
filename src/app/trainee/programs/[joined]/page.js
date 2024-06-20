'use client'

import { fetchTraineePrograms } from '@/server/action'
import { useQuery } from "@tanstack/react-query"
import ProgramPreview from './program_preview'
import "@/styles/trainee.css"

export default function Programs({ params }) {
    const joined = params.joined == "true"

    const { data: res, is_fetching } = useQuery({
        queryFn: () => fetchTraineePrograms(joined),
        queryKey: ["programs", { joined }]
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
            <div className="page_section">
                <span className="page">{joined ? "Joined" : "Available"} programs</span>
            </div>
            <div className="program_section">
            {res.programs.map(program =>
                <ProgramPreview key={program.program_id} program_id={program.program_id} name={program.name} joined={joined}></ProgramPreview>)}
            </div>
        </>
    )
}