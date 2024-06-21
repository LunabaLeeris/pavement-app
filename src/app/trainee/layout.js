'use client'

import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/trainee.css"
import LogoButton from "@/components/logo_button";

const queryClient = new QueryClient()

export default function Layout({ children }) {
    const router = useRouter()



    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="nav">
                    <div id="logo">
                        <img style={{ cursor: "pointer" }} onClick={() => router.push("/trainee/programs/true")} id="microsoft" src="/microsoft_i.svg"></img>
                        <span style={{ cursor: "pointer" }} onClick={() => router.push("/trainee/programs/true")} id="pavement">Pavement</span>
                    </div>
                    <div class="nav_buttons">
                        <LogoButton src="/icons/book.svg" text="joined" fn={() => router.push(`/trainee/programs/${true}`)}></LogoButton>
                        <LogoButton src="/icons/books.svg" text="available" fn={() => router.push(`/trainee/programs/${false}`)}></LogoButton>
                        {/*<LogoButton src="/icons/bell.svg" text="notifications" fn={() => router.push("/trainee/notification")}></LogoButton>*/}
                        <LogoButton src="/icons/person.svg" text="profile" fn={() => router.push("/trainee/profile")}></LogoButton>
                    </div>
                </div>
                <div style={{minHeight: "700px"}}>
                    {children}
                </div>
                <hr style={{ color: "#1E1E1E", opacity: ".3", marginBottom: "25px", marginTop: "50px" }}></hr>
                <div style={{justifyContent: "center", display: "flex", gap: "25px", alignItems: "center"}}>
                    <p>© Pavement (2024), All rights reserved.</p>
                    <p onClick={() => router.push("https://github.com/LunabaLeeris")} style={{color: "#81BC06", fontSize: "15px", cursor: "pointer"}}>Visit Creator</p>
                </div>
            </QueryClientProvider>
        </>
    )
}