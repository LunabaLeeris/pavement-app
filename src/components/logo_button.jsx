export default function LogoButton({src, text, fn}){
    const style = {
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        width: "24px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    }
    
    const text_style = {
        font: "inherit",
        color: "#1E1E1E",
        fontSize: "13px"
    }
    return (
        <div style={style} onClick={fn}>
            <img src={src}></img>
            <span style={text_style}>{text}</span>
        </div>
    )
}