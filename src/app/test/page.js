'use client'

import LogoButton from "@/components/logo_button"
import Status from "@/components/status"

export default async function Loading() {   
    return (
      <>
        <LogoButton src="/icons/person.svg" text="Profile" fn={() => console.log("ok")}></LogoButton>
      </>
    )
  } 
  