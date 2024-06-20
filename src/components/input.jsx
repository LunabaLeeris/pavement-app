import { forwardRef } from "react"

export const Input = forwardRef(({ labeled=true, name, type, width }, ref) => {
    const label_style = {
        fontSize: "15px",
        fontWeight: "600",
        color: "#1E1E1E"
    }   

    const input_style = {
        marginTop: "5px",
        height: "40px",
        width: `calc(${width} - 30px)`,
        border: "1px solid rgba(30, 30, 30, 0.5)",
        outline: "none",
        font: "inherit",
        fontSize: "12px",
        borderRadius: "3px",
        color: "#1E1E1E",
        paddingLeft: "10px",
        paddingRight: "20px"
    }

    return (
        <div>
            {labeled ? <label style={label_style} for={name}>{name}</label> : ""}
            <input style={input_style} name={name} type={type} placeholder={"Input " + name + " here"} ref={ref} required></input>
        </div>
    )
})