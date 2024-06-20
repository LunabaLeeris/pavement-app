'use client'

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function LessonMaterial({ number, header, description, material_link }) {
    const pdf = useRef()
    const router = useRouter()

    const style = {
        border: "1px solid rgb(30, 30, 30, .2)",
        display: "inline-block",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "5px",
        boxShadow: "0px 5px 5px 0px rgba(0,0,1,0.1)",
        cursor: "pointer",
        marginBottom: "50px"
    }   

    const convert_to_pdf_name = (str) => {
        const regex = new RegExp(' ', 'g');
        return str.replace(regex, '_');
    }

    const highlight = () => {
        pdf.current.style.backgroundColor = "#F0F0F0"
    }

    const remove_highlight = () => {
        pdf.current.style.backgroundColor = "#FFFFFF"
    }

    return (
        <div>
            <div>
                <h2>Section {number + 1}: {header}</h2>
                <p>{description}</p>
            </div>
            <div ref={pdf} style={style} onClick={() => router.push(material_link)} onMouseEnter={highlight} onMouseLeave={remove_highlight} >
                <p style={{color: "#F35325", width: "auto"}}>{convert_to_pdf_name(header)}.pdf</p>
            </div>
        </div>
    )
}