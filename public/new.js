const newform = document.querySelector(".newform");
const cancelbtn = document.querySelector(".cancelbtn");

function addNewTask(){
    newform.classList.remove("d-none");
    window.location.href = "#newform";
}

cancelbtn.addEventListener("click", (event)=>{
    event.preventDefault();
    newform.classList.toggle("d-none");
})