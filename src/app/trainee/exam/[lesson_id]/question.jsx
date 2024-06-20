export default function Question({ number, description, question, input, case_sensitive, A, B, C, D }) {
    return (
        <div style={{ marginBottom: "50px" }}>
            <h3>{number}. {question}</h3>
            <p>{description}</p>
            <div style={{paddingLeft: "15px"}}>
                <p>A: {A}</p>
                <p>B: {B}</p>
                <p>C: {C}</p>
                <p>D: {D}</p>
                {input}
            </div>
        </div>
    )
}