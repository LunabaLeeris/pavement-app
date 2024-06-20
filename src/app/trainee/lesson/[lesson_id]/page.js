'use client'

import { fetchTraineeLessonMaterials } from "@/server/action"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { convert_to_date } from "@/lib/date_format"
import LessonMaterial from "./lesson_material"
import Button from "@/components/button"

export default function Page({ params }) {
    const lesson_id = params.lesson_id
    const router = useRouter()

    const { data: res, is_fetching } = useQuery({
        queryFn: () => fetchTraineeLessonMaterials(lesson_id),
        queryKey: ["materials", { lesson_id }]
    })

    if (is_fetching || !res) return <h1>Fetching materials...</h1>
    if (res.error != "none") return <h1>Fetching materials failed...</h1>

    return (
        <div>
            <div>
                <h2>{res.lesson.name}</h2>
                <p>{res.lesson.description}</p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p><b>Date Created:</b> {convert_to_date(res.lesson.date_created)}</p>
                    <Button bg_color="#81BC06" text="Take Exam" width="250px" fn={() => router.push(`/trainee/exam/${lesson_id}`)}></Button>
                </div>
                <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            </div>
            <div >
                {(res.materials.map((material, index) => <LessonMaterial key={index} number={index} header={material.header}
                    description={material.description} material_link={material.material_link}></LessonMaterial>))}
            </div>
        </div>
    )
}