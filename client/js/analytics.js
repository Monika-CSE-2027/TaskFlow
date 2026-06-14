const token =
localStorage.getItem("token");

if(!token){

    window.location.href =
    "index.html";

}

async function loadAnalytics(){

    try{

        const response =
        await fetch(
        "http://localhost:5000/api/tasks",
        {
            headers:{
                Authorization:token
            }
        });

        const tasks =
        await response.json();

        const total =
        tasks.length;

        const completed =
        tasks.filter(
        task =>
        task.status ===
        "Completed"
        ).length;

        const pending =
        tasks.filter(
        task =>
        task.status ===
        "Pending"
        ).length;

        const progress =
        tasks.filter(
        task =>
        task.status ===
        "In Progress"
        ).length;

        document
        .getElementById(
        "totalTasks"
        ).innerText =
        total;

        document
        .getElementById(
        "completedTasks"
        ).innerText =
        completed;

        document
        .getElementById(
        "pendingTasks"
        ).innerText =
        pending;

        document
        .getElementById(
        "progressTasks"
        ).innerText =
        progress;

        let completionRate = 0;

        if(total > 0){

            completionRate =
            Math.round(
            (completed/total)
            *100
            );

        }

        document
        .getElementById(
        "completionRate"
        ).innerText =
        completionRate + "%";

        document
        .getElementById(
        "progressBar"
        ).style.width =
        completionRate + "%";

        const score =
        completionRate;

        document
        .getElementById(
        "productivityScore"
        ).innerText =
        score;

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

loadAnalytics();