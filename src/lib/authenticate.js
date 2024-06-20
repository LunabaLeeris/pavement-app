export async function login(classification, email, password) {
    console.log("logging in...")
    const data_to_send = {
        classification: classification,
        email: email,
        password: password
    }

    try {
        const response = await fetch('/login/api', {
            method: 'POST',
            body: JSON.stringify(data_to_send),
        })

        const parsed_response = await response.json()
        return parsed_response
    }
    catch (error) {
        console.log("Error submitting form: ", error)
        return { error: "form-error" }
    }
}