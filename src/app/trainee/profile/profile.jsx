'use client'

import Button from "@/components/button"
import { useRouter } from "next/navigation"

export default function Profile({ account, certificates, contacts, educations, experiences, programs, signOut }) {
    const router = useRouter()

    const name_style = {
        font: "inherit",
        fontSize: "20px",
        fontWeight: "bold"
    }

    const certificate_style = {
        border: "1px solid rgb(30, 30, 30)",
        borderRadius: "5px",
        padding: "20px",
        font: "inherit",
        fontWeight: "500",
        color: "#1E1E1E"
    }

    const viewResume = () => {
        try {
            router.push(account.resume)
        }
        catch (err){
            console.log("resume link unavailable")
        }
    }

    return (
        <div>
            <p className="page" style={{ marginBottom: "25px" }}>Profile</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "50px" }}>
                    <img src="/profile.svg"></img>
                    <div style={{ paddingTop: "25px", paddingBottom: "25px" }}>
                        <span style={name_style}>{account.first_name + " " + account.last_name}</span>
                        <p>{account.description}</p>
                        <div style={{ display: "flex", gap: "25px" }}>
                            <p>{account.email}</p>
                            <p style={{ color: "#235A9F", cursor: "pointer" }}>Edit Profile</p>
                            <p onClick={() => viewResume()} style={{ color: "#81BC06", cursor: "pointer" }}>View Resume</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Button bg_color="#F35325" text="Sign Out" width="200px" fn={signOut}></Button>
                </div>
            </div>
            <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            <p className="page" style={{ marginBottom: "25px" }}>Certificates</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {certificates.length > 0 ? certificates.map((cert, index) => <span index={index}
                    style={certificate_style}>{cert.name}</span>) : <p style={{ opacity: ".7" }}>No certificates to show...</p>}
            </div>
            <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            <p className="page" style={{ marginBottom: "25px" }}>About me</p>
            <p>{account.about_me}</p>
            <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            <p className="page" style={{ marginBottom: "25px" }}>Experience</p>
            {experiences.map((exp, index) => <p index={index}>○ {exp.description}</p>)}
            <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            <p className="page" style={{ marginBottom: "25px" }}>Education</p>
            {educations.map((educ, index) => <p index={index}>○ {educ.description}</p>)}
            <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "50px", marginTop: "50px" }}></hr>
            <p className="page" style={{ marginBottom: "25px" }}>Programs</p>
            {programs.map((p, index) => <p index={index}>○ {p.name}</p>)}
        </div>
    )
}