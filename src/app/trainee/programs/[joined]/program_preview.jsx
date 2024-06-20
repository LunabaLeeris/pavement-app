'use client'

import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function ProgramPreview({ program_id, name, joined}) {
    const router = useRouter()
    const colors = ["#F35325", "#7DA40D", "#D55A15", "#81BC06", "#235A9F", "#092642"]
    const container = useRef()

    const visit = () => {
        router.push(`/trainee/program/${program_id}/${joined}`)
    }

    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid rgb(30, 30, 30, .2)",
        height: "300px",
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        gap: "20px",
        boxShadow: "0px 5px 5px 0px rgba(0,0,1,0.1)"
    }

    const name_style = {
        font: "inherit",
        fontSize: "20px",
        fontWeight: "normal",
        width: "70%",
        textAlign: "center"
    }

    const icon_style = {
        width: "100px",
        height: "100px",
        backgroundColor: colors[((program_id + 2)%colors.length)-1],
        display: "flex",
        justifyContent: "center",
        borderRadius: "5px"
    }

    const icon_text_style = {
        width: "100%",
        height: "100%",
        textAlign: "center",
        alignContent: "center",
        font: "inherit",
        fontSize: "30px",
        fontWeight: "bold",
        color: "#1E1E1E"
    }

    const highlight = () => {
        container.current.style.backgroundColor = "#F0F0F0"
    }

    const remove_highlight = () => {
        container.current.style.backgroundColor = "#FFFFFF"
    }

    return (
        <div style={style} ref={container} onMouseEnter={highlight} onMouseLeave={remove_highlight} className="program_box" onClick={visit}>
            <div style={icon_style}>
                <span style={icon_text_style}>{name[0]+name[1]}</span>
            </div>
            <span style={name_style}>{name}</span>
        </div>
    )
}