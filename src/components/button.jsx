export default function Button({bg_color, type, text, width, fn}){
    const btn_style = {
        width: width,
        height: "50px",
        fontSize: "15px",
        fontWeight: "600",
        color: "#E7F4FF",
        backgroundColor: bg_color,
        border: "none",
        borderRadius: "3px",
        cursor: "pointer"
    }

    return <button style={btn_style} type={type} onClick={fn}>{text}</button>

}