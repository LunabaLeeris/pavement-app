'use client'

import { login } from "@/lib/authenticate"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/input"
import Button from "@/components/button"
import "@/styles/login.css"

export default function Login() {
    const [classification, setClassification] = useState("trainee")
    const trainee_button = useRef()
    const trainor_button = useRef()
    const [error, setError] = useState("")
    const email = useRef("")
    const password = useRef("")
    const router = useRouter()

    useEffect(() => changeClassification("trainee"), [])

    const authenticate = async (form) => {
        console.log("authenticating")
        console.log(email.current.value + " | " + password.current.value)
        form.preventDefault()
        const res = await login(classification, email.current.value, password.current.value)
        if (res.error == "none") router.push("/" + classification)
        setError(() => res.error)
    }

    const changeClassification = (c) => {
        setClassification(() => c)

        if (c == "trainee")
            highlight(trainee_button, trainor_button)
        else
            highlight(trainor_button, trainee_button)
    }

    const highlight = (to_highlight, to_shadow) => {
        to_highlight.current.style.color = "#092642"
        to_highlight.current.style.opacity = "1"
        to_highlight.current.style.fontWeight = "bold"
        to_shadow.current.style.color = "#1E1E1E"
        to_shadow.current.style.opacity = "0.7"
        to_shadow.current.style.fontWeight = "normal"
    }

    return (
        <div className="section">
            <img src="/microsoft_i.svg" alt="icon"></img>
            <div className="outer">
                <div className="illus">
                    <img src="/login_i.svg" alt="icon"></img>
                </div>
                <div className="login">
                    <span id="greetings">Welcome To Microsoft Pavement</span>
                    <div className="class_section">
                        <button ref={trainee_button} onClick={() => changeClassification("trainee")} class="classification">Trainee</button>
                        <button ref={trainor_button} onClick={() => changeClassification("trainor")} class="classification">Trainor</button>
                        <hr style={{ opacity: "50%" }}></hr>
                    </div>
                    <h3>{error}</h3>
                    <form onSubmit={authenticate}>
                        <div className="login_form">
                            <Input name="Email" type="text" width="100%" ref={email}></Input>
                            <Input name="Password" type="password" width="100%" ref={password}></Input>
                        </div>
                        <div style={{marginTop: "60px"}}>
                        <Button bg_color="#174276" type="submit" text="Sign In" width="100%" ></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}