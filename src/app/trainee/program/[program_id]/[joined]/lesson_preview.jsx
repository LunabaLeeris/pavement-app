'use client'

import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function Lesson({ lesson_id, number, name, description, joined, available }) {
    const router = useRouter()
    const container = useRef()

    const visit = () => {
        if (!joined || !available) return
        router.push(`/trainee/lesson/${lesson_id}`)
    }

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: joined && available ? "1" : ".5"
    }

    const lesson_style = {
        width: "800px",
        height: "auto",
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        boxShadow: "0px 5px 5px 0px rgba(0,0,1,0.1)",
        padding: "25px",
        marginBottom: "34px"
    }

    const title_style = {
        font: "inherit",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center"
    }

    const highlight = () => {
        if (!joined || !available) return
        container.current.style.backgroundColor = "#F0F0F0"
    }

    const removeHighlight = () => {
        container.current.style.backgroundColor = "#FFFFFF"
    }

    return (
        <div style={style} >
            <div onClick={visit} onMouseEnter={highlight} onMouseLeave={removeHighlight} ref={container} style={lesson_style}>
                <span style={title_style}>Lesson {number + 1}: {name}</span>
                <p style={{opacity: ".9"}}>{description}</p>
            </div>
        </div>
    )
}