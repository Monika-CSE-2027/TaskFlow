const token =
localStorage.getItem("token");

if(!token){

    window.location.href =
    "index.html";

}

async function loadProfile(){

    try{

        const response =
        await fetch(
        "http://localhost:5000/api/profile",
        {
            headers:{
                Authorization:token
            }
        });

        const data =
        await response.json();

        document
        .getElementById("name")
        .innerText =
        data.user.name;

        document
        .getElementById("email")
        .innerText =
        data.user.email;

        document
        .getElementById("totalTasks")
        .innerText =
        data.totalTasks;

        document
        .getElementById("completedTasks")
        .innerText =
        data.completedTasks;


        document
        .getElementById("inProgressTasks")
        .innerText = 
        data.inProgressTasks;

        document
        .getElementById("pendingTasks")
        .innerText = 
        data.pendingTasks;


    }
    catch(error){

        console.log(error);

    }

}

function logout(){

    localStorage.removeItem(
    "token"
    );

    window.location.href =
    "index.html";

}

loadProfile();