let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    login_user();
});

async function login_user() {
    let uname = form.fname.value + " " + form.lname.value;
    try {
        let res = await fetch("http://localhost:4500/users/register", {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                name: uname,
                email: form.email.value,
                pass: form.password.value
            })
        });
        res = await res.json();
        console.log(res.msg);
    } catch (error) {
        return error
    }
}