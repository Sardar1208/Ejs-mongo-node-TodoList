const tasks = document.querySelectorAll(".task");
const edittask = document.querySelectorAll(".edittask");
const badges = document.querySelectorAll(".priority");
const checkboxes = document.querySelectorAll(".checkbox");
const deadlines = document.querySelectorAll(".deadline");
const hidden = document.querySelectorAll(".hidden");
const editform = document.querySelectorAll(".editform");
const formtoedit = document.querySelectorAll(".formtoedit");
const formtopriority = document.querySelectorAll(".formtopriority");
const formtodeadline = document.querySelectorAll(".formtodeadline");
const formtocheck = document.querySelectorAll(".formtocheck");
const editpriorityform = document.querySelectorAll(".priorityform");
const select = document.querySelectorAll(".select");
const editdeadline = document.querySelectorAll(".editdeadline");
const deadlineform = document.querySelectorAll(".deadlineform");
const cnt = document.querySelectorAll(".cnt");
const pdnd = document.querySelectorAll(".pdnd");
const sort = document.querySelector(".sort");
const count = document.querySelectorAll(".count");

let editing = false; //shows if we are editing or not

let currSortVal = localStorage.getItem('sorting');
// console.log(currSortVal);
sort.value = currSortVal;
// sort.

for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", () => {
        if (!editing) {
            // set editing to true, so that we cant edit more than 1 task at a time.
            editing = true;
            cnt[i].classList.toggle("d-none");
            pdnd[i].classList.toggle("d-none");
            editform[i].style.display = "inline-block";
            edittask[i].focus();

            // When focus out i.e. click outside of the input field, close the editing view and unhide stuff.
            edittask[i].addEventListener('focusout', () => {
                cnt[i].classList.remove("d-none");
                pdnd[i].classList.remove("d-none");
                editform[i].style.display = "none";
                editing = false;
                formtoedit[i].requestSubmit();
            })
        }
    })
}

for (let i = 0; i < tasks.length; i++) {
    badges[i].addEventListener("click", () => {
        if (!editing) {
            editing = true;
            badges[i].classList.toggle("d-none");
            editpriorityform[i].style.display = "inline-block";
            select[i].focus();

            select[i].addEventListener('focusout', () => {
                badges[i].classList.remove("d-none");
                editpriorityform[i].style.display = "none";
                editing = false;
                formtopriority[i].requestSubmit();
            })
        }
    })
}

for (let i = 0; i < tasks.length; i++) {
    deadlines[i].addEventListener("click", () => {
        if (!editing) {
            editing = true;
            deadlines[i].classList.toggle("d-none");
            deadlineform[i].style.display = "inline-block";
            editdeadline[i].focus();

            editdeadline[i].addEventListener('focusout', () => {
                console.log("out");
                deadlines[i].classList.remove("d-none");
                deadlineform[i].style.display = "none";
                editing = false;
                formtodeadline[i].requestSubmit();
            })
        }
    })
}

for (let i = 0; i < tasks.length; i++) {
    checkboxes[i].addEventListener("click", () => {
        console.log("clicked");
        if(checkboxes[i].checked){
            hidden[i].disabled = true;
        }
        formtocheck[i].requestSubmit();
    })
    if(checkboxes[i].checked == true){
        tasks[i].style.textDecoration = "line-through";
        tasks[i].style.color = "grey"
    }
    // console.log(count[i].innerText);
    if(count[i].innerText <= 1){
        deadlines[i].style.color = "red";
    }
}



sort.addEventListener("change", () => {
    let sortVal = sort.value;
    localStorage.setItem('sorting', sortVal);
    // sortBy(sortVal);
})

// function sortBy(method){
//     if(method == "priority"){

//     }
// }