'use client'

import { getCertificate } from "@/server/action"
import { useQuery } from "@tanstack/react-query"
import CertificateAward from "./certificate_award"
import { convert_to_date } from "@/lib/date_format"

export default function Page({ params }) {
    const program_id = params.program_id

    const { data: res, is_fetching } = useQuery({
        queryFn: () => getCertificate(program_id),
        queryKey: ["certificate", { program_id }]
    })

    if (is_fetching || !res) return <h1>Fetching certificate...</h1>
    if (res.error != "none") {
        return <>
            <h1>Fetching failed...</h1>
            <h1>{res.error}</h1>
        </>
    }

    const data = res.certificate[0]

    //return JSON.stringify(res)
    return <CertificateAward account_id={data.account_id} name={data.first_name + " " + data.last_name} 
    program={data.name} date_acquired={convert_to_date(data.date_acquired)}></CertificateAward>
}