const loginButton = document.querySelector("#loginButton")
const googleLogin = document.querySelector("#googleLogin")

loginButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/login", opts)
        response = await response.json()
        console.log(response)
        alert(response.message)
        if (response.statusCode === 200) {
            location.replace("/")
        }   

    } catch (error) {
        alert(error.message)
    }
})

googleLogin.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        let response = await fetch("/api/sessions/google", opts)
        response = await response.json()
    } catch (error) {
        alert(error.message)
    }
})


