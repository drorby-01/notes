let sub = document.getElementsByClassName("btn btn-success");
let mission = document.getElementById("input-text-mission")
let date = document.getElementById("input-date")
let time = document.getElementById("input-time")
let notetotal = +localStorage.getItem("totalNotes")
readFromStorage()
styleNote()
Events();
sub[0].addEventListener("click", (event) => {
    event.preventDefault()
    if (checkfields()) {
        makeNote(mission.value, date.value, time.value);
        clearfields();
        styleNote();
        Events();
    }
});


function makeNote(missionToDo, dateToDoMission, timeToDoMission) {

    let layoutNote = document.createElement("div")
    layoutNote.style.backgroundImage = "url(../images/notebg.png)"
    layoutNote.style.backgroundSize = "cover"
    layoutNote.style.width = "200px"
    layoutNote.style.height = "250px"
    layoutNote.style.marginRight = "10px"
    layoutNote.className = "fade-in"

    let closeBtn = document.createElement("button")
    closeBtn.className = "btn-close"
    closeBtn.style.height = "36px"
    closeBtn.style.width = "36px"
    closeBtn.style.marginTop = "20px"
    closeBtn.style.border = "solid 2px black"
    closeBtn.style.borderRadius = "50%"
    closeBtn.style.display = "none"

    let span = document.createElement("span");
    span.style.display = "block"
    span.className = "glyphicon glyphicon-remove"
    closeBtn.appendChild(span);

    let textarea = document.createElement("textarea");
    textarea.className = "textarea"
    textarea.value = missionToDo


    let date = document.createElement("input")
    date.setAttribute("type", "date")
    date.className = "date"
    date.style.pointerEvents = "none"
    date.value = dateToDoMission;

    let time = document.createElement("input")
    time.setAttribute("type", "time")
    time.className = "time"
    time.style.pointerEvents = "none"
    time.value = timeToDoMission;

    layoutNote.appendChild(closeBtn);
    layoutNote.appendChild(textarea);
    layoutNote.appendChild(date);
    layoutNote.appendChild(time);
    document.getElementById("notes").appendChild(layoutNote);
}

function Events() {
    let arrayOfNotes = Array.from(document.getElementsByClassName("fade-in"))
    let arrayOfBtnClose = Array.from(document.getElementsByClassName("btn-close"))

    for (let i = 0; i < arrayOfNotes.length; i++) {
        arrayOfNotes[i].addEventListener("mouseover", event => {
            arrayOfBtnClose[i].style.display = "block"
            arrayOfNotes[i].style.height = "300px"
            layoutNote.style.width = "200px"
        })
        arrayOfNotes[i].addEventListener("mouseout", event => {
            arrayOfBtnClose[i].style.display = "none"
            arrayOfNotes[i].style.height = "250px"
            layoutNote.style.width = "200px"
        })
        arrayOfBtnClose[i].addEventListener("click", event => {
            arrayOfNotes[i].remove()
            updateStorage(arrayOfNotes)
        })
    }

}

function styleNote() {
    let arrayOfTextArea = document.getElementsByClassName("textarea");
    let arrayOfDate = document.getElementsByClassName("date")
    let arrayOfTime = document.getElementsByClassName("time")
    Array.from(arrayOfTextArea).forEach((element) => {
        element.style.resize = "none";
        element.style.backgroundColor = "#feff99"
        element.style.marginTop = "30px";
        element.style.marginLeft = "10px";
        element.style.height = "100px";
        element.style.border = "none"

    })

    Array.from(arrayOfDate).forEach((element) => {
        element.style.backgroundColor = "#feff99"
        element.style.marginLeft = "10px";
        element.style.marginTop = "20px";
        element.style.border = "none"
    })

    Array.from(arrayOfTime).forEach((element) => {
        element.style.marginLeft = "10px";
        element.style.marginTop = "10px";
        element.style.backgroundColor = "#feff99"
        element.style.border = "none"
    })

}

function checkfields() {
    let flag = true;
    if (mission.value === "") {
        flag = false;
        alert("you forgot insert the mission")
    }
    if (date.value === "") {
        flag = false;
        alert("you forgot insert the date")
    }
    if (time.value === "") {
        flag = false;
        alert("you forgot insert the time")
    }
    return flag;
}

function clearfields() {
    mission.value = ""
    date.value = ""
    time.value = ""
}


window.addEventListener("beforeunload", event => {
    localStorage.clear()
    let arrayOfNotes = Array.from(document.getElementsByClassName("fade-in"))
    arrayOfNotes.forEach((element, indexnote) => {
        localStorage.setItem(`${++indexnote}`, JSON.stringify(`${element.querySelector("textarea").value},${element.querySelector("input[type=date]").value},${element.querySelector("input[type=time]").value}`));
    })
    localStorage.setItem("totalNotes", arrayOfNotes.length)

})


function readFromStorage() {
    let note;
    if (notetotal === 0)
        return
    else {
        for (let i = 1; i <= notetotal; i++) {
            note = JSON.parse(localStorage.getItem(i));
            makeNote(note.split(",")[0], note.split(",")[1], note.split(",")[2])
        }
    }
}
