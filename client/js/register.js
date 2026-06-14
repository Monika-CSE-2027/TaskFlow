async function registerUser(){

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const successMsg =
    document.getElementById("successMsg");

    const errorMsg =
    document.getElementById("errorMsg");

    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    if(
        !name ||
        !email ||
        !password
    ){

        errorMsg.innerText =
        "Please fill all fields";

        errorMsg.style.display =
        "block";

        return;
    }

    try{

        const response =
        await fetch(
        "https://taskflow-backend-q2ia.onrender.com/api/auth/register",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                name,
                email,
                password
            })
        });

        const data =
        await response.json();

        if(response.ok){

            successMsg.innerText =
            "Registration Successful ✓";

            successMsg.style.display =
            "block";

            setTimeout(() => {

                window.location.href =
                "index.html";

            }, 1500);

        }else{

            errorMsg.innerText =
            data.message;

            errorMsg.style.display =
            "block";

        }

    }
    catch(error){

        console.log(error);

        errorMsg.innerText =
        "Server Connection Failed";

        errorMsg.style.display =
        "block";

    }

}