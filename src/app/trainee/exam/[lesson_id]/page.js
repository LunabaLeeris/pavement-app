'use client'

import { addLessonLog, fetchTraineeLessonExam } from "@/server/action"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useRef } from 'react'
import Question from "./question"
import Button from "@/components/button"
import { Input } from "@/components/input"

export default function Page({ params }) {
    const lesson_id = params.lesson_id
    const router = useRouter()
    const input_fields = useRef([]);

    const { data: res, is_fetching } = useQuery({
        queryFn: () => fetchTraineeLessonExam(lesson_id),
        queryKey: ["exam", { lesson_id }]
    })

    const { mutateAsync: addToLessonLog } = useMutation({
        mutationFn: addLessonLog
    })

    if (is_fetching || !res) return <h1>Fetching materials...</h1>
    if (res.error != "none") return <h1>Fetching materials failed...</h1>

    const checkAnswers = async () => {
        let correct = 0
        let out_of = 0

        for (const index in input_fields.current) {
            if (input_fields.current[index].value == res.questions[index].answer) correct++
            out_of++
        }

        const passed = (correct / out_of) * 100 >= res.exam[0].passing_percentage
        if (passed) {
            const res_add = await addToLessonLog(lesson_id)
            if (res_add.error != "none") router.push(`/trainee/results/null/null/null/null`)
        }

        router.push(`/trainee/results/${lesson_id}/${passed}/${correct}/${out_of}`)
    }

    input_fields.current = res.questions.map((question, index) => (
        <Input labeled={false} key={index} type="text" name="answer" ref={el => input_fields.current[index] = el} ></Input>
    ));

    return (
        <div>
            <div>
                <h2>{res.exam[0].header}</h2>
                <p style={{marginBottom: "50px"}}>{res.exam[0].description}</p>
                <p><b>Passing Grade: </b>{res.exam[0].passing_percentage}%</p>
                <p><b>Total Items: {res.questions.length}</b></p>
                <hr style={{marginBottom: "50px", marginTop: "50px"}}></hr>
            </div>
            <div>  
                {res.questions.map((question, index) => <Question key={index} number={question.priority}
                    question={question.question} input={input_fields.current[index]} description={question.description}
                    case_sensitive={question.case_sensitive} A={question.optionA} B={question.optionB}
                    C={question.optionC} D={question.optionD}></Question>)}
                <hr style={{marginBottom: "50px", marginTop: "50px"}}></hr>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Please recheck your answers before submitting</p>
                <Button bg_color="#F35325" width={"200px"} text="Submit Answers" fn={() => checkAnswers(input_fields)}></Button>
            </div>
            
        </div>
    )
}