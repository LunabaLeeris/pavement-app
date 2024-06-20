export default async function Status({src, text}) {
    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    }

    const text_style = {
        font: "inherit",
        color: "1E1E1E",
        fontWeight: "bold",
        fontSize: "30px"
    }

    const image_style = {
        height: "300px",
        width: "auto"
    }

    return (
      <div style={style}>
          <img style={image_style} src={src}></img>
          <span style={text_style}>{text}</span>
      </div>
    )
  } 
  