export default function CertificateAward({account_id, name, program, date_acquired}){
    const style = {
        display: "flex",
        justifyContent: "center"
    }

    return (
        <div style={style}>
            <img src="/certificate.svg"></img>
            {/*<h3>This certificate is awarded to</h3>
            <h1>{name}</h1>
            <h3>for completing the program</h3>
            <h1>{program}</h1>
            <p>awarded on {date_acquired}</p>
            <p>trainee id: {account_id}</p>*/}
        </div>
    )
}