let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    login_user();
});

async function login_user() {
    try {
        let res = await fetch("http://localhost:4500/users/login", {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                email: form.email.value,
                pass: form.password.value
            })
        });
        res = await res.json();
        if(res.msg == "Signup before logging in"){
            alert(res.msg);
            window.location = "http://127.0.0.1:5500/frontend/register.html";
        }else if(res.msg == "Logged In!!"){
            window.location = "http://127.0.0.1:5500/frontend/index.html";
        }
        console.log(res.msg);
    } catch (error) {
        return error
    }
}