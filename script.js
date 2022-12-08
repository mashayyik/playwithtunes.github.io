let mainKey = document.querySelectorAll(".key")
let recordingList = document.getElementById('recordingList')
let keyAvailable = ['1', '2', '3', '4', '5', '6', '7', '8'];
let stopRecordingButton = document.getElementById('stopRecordingButton')
let recordingTooggle = document.querySelector('.recordingTooggle')
let recordingButton = document.querySelector('.recordingButton')
let songName = document.getElementById("songName")
let composerName = document.getElementById("composerName")
let textrecording = document.getElementById("textrecording")
let btnUpdate = document.getElementById("btnUpdate")
let soundTrackName = document.getElementById("soundTrackName")
var editID = -1;

let selectedTempo = 1

let id = 0

const tempoButtons = document.querySelectorAll('input[name="tempo"]');
let save = (tempo) => {
    selectedTempo = tempo
    textrecording.innerHTML = "Success! Tempo has been changed"
    setTimeout(() => {
        textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
    }, 2000);
}

let audio = new Audio("src/1.wav");

let soundtrack = []

let temp = []

mainKey.forEach(key => {
    key.addEventListener('click', () => sound(key.dataset.key))
})

let pressedKey = (keyPress) => {
    if (keyAvailable.includes(keyPress.key)) {
        sound(keyPress.key)
        if (recording()) {
            temp.push(keyPress.key)
        }
    }
}
document.addEventListener('keydown', pressedKey)

let clicked = (mouseClick) => {
    let textValue = mouseClick.target.outerText
    if (keyAvailable.includes(textValue)) {
        if (recording()) {
            temp.push(textValue)
        }
    }
}

document.addEventListener('click', clicked)

let recording = () => {
    let recordingToggle = document.getElementById('recordingToggle')
    let recording = false
    if (recordingToggle.checked) {
        if (!composerName.value && !songName.value) {
            textrecording.innerHTML = "INPUT NAME AND SONG FIRST"
            setTimeout(() => {
                textrecording.innerHTML = 'DONT MAKE ME ANGRY :('
            }, 1000);
            setTimeout(() => {
                textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
            }, 2000);
            recordingToggle.checked = false
        } else if (!composerName.value) {
            textrecording.innerHTML = "COMPOSER NAME CANT BE EMPTY"
            setTimeout(() => {
                textrecording.innerHTML = 'TRY AGAIN :('
            }, 1000);
            setTimeout(() => {
                textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
            }, 2000);
            recordingToggle.checked = false
        } else if (!songName.value) {
            textrecording.innerHTML = "SONG NAME CANT BE EMPTY"
            setTimeout(() => {
                textrecording.innerHTML = 'TRY AGAIN :('
            }, 1000);
            setTimeout(() => {
                textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
            }, 2000);
            recordingToggle.checked = false
        } else {
            textrecording.innerHTML = "RECORDING ..."
            recordingTooggle.classList.add("active")
            recordingButton.classList.add("active")
            recording = true
        }

        return recording
    }
}
let stopRecording = () => {
    if (stopRecordingButton.click) {
        if (temp.length === 0) {
            textrecording.innerHTML = "YOU DIDNT INPUT ANYTHING"
            return
        }
        textrecording.innerHTML = "AWESOME TUNES!! GOOD JOB"
        setTimeout(() => {
            textrecording.innerHTML = 'SAVING'
        }, 2000);
        setTimeout(() => {
            textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
        }, 2000);
        recordingButton.classList.remove("active")
        recordingTooggle.classList.remove("active")
        setTimeout(() => {
            recordingToggle.checked = false
        }, 500);
        soundtrack.push(temp)
        temp = []
    }
    if (soundtrack.length > 0) {
        let li = document.createElement("li");
        let liText1 = document.createElement("p");
        let liText2 = document.createElement("p");
        let liText3 = document.createElement("p");
        liText1.innerHTML = composerName.value;
        liText1.setAttribute('id', `nama${id}`)
        liText2.innerHTML = songName.value;
        liText2.setAttribute('id', `song${id}`)
        liText3.innerHTML = `${soundtrack[id].length} Tunes`;
        liText3.setAttribute('id', `track${id}`)
        liText3.classList.add("track")
        li.appendChild(liText1)
        li.appendChild(liText2)
        li.appendChild(liText3)
        li.innerHTML += `<button onclick="playlist(${id})">PLAY</button>`
        li.innerHTML += `<button onclick="editList(${id})">EDIT</button>`
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "DELETE"
        deleteButton.addEventListener("click", deleteList)
        li.appendChild(deleteButton)
        li.classList.add("li-playlist")
        recordingList.style.display = "block"
        recordingList.appendChild(li)
        composerName.value = ""
        songName.value = ""
        editID = id
        id++
    }
}

function playlist(id) {
    let tempo = selectedTempo * 250
    let track = soundtrack[id]
    for (let i = 0; i < track.length; i++) {
        const perNada = track[i];
        setTimeout(function () {
            sound(perNada)
        }, tempo * i);
    }
    textrecording.innerHTML = 'Playing ...'
    setTimeout(() => {
        textrecording.innerHTML = 'WOW, AWESOME INTRUMENTAL !!!'
    }, tempo * track.length - 1);
    setTimeout(() => {
        textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
    }, 2 * tempo * track.length - 1);
}

function editList(id) {
    recordingToggle.style.display = "none";
    textrecording.style.display = "none";
    composerName.className += " lebar";
    songName.className += " lebar";
    composerName.focus()
    soundTrackName.style.display = "block";
    btnUpdate.style.display = "block"
    let nama = document.getElementById(`nama${id}`)
    let song = document.getElementById(`song${id}`)
    let track = soundtrack[id]
    soundTrackName.value = track
    composerName.value = nama.innerText
    songName.value = song.innerText
    btnUpdate.addEventListener('click', update)
}

function validateTrack(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        const perArr = arr[i];
        if (keyAvailable.includes(perArr)) {
            result.push(perArr)
        }
    }
    return result
}

function update() {
    let id = editID - 1
    let nama = document.getElementById(`nama${id}`)
    let song = document.getElementById(`song${id}`)
    let totalTunes = document.getElementById(`track${id}`)
    let newArr = (soundTrackName.value).split(",")
    newArr = validateTrack(newArr)
    soundtrack[id] = newArr
    if (nama.textContent === composerName.value && nama.textContent === composerName.value && `${soundtrack[id].length} Tunes` === totalTunes.textContent) {
        textrecording.innerHTML = "YOU NOT CHANGE DATA ANYTHING"
        nama.style.color = "red"
        song.style.color = "red"
        totalTunes.style.color = "red"
        nama.style.fontSize = "x-large"
        song.style.fontSize = "x-large"
        totalTunes.style.fontSize = "x-large"
    } else {
        textrecording.innerHTML = "AWESOME !!"
        setTimeout(() => {
            textrecording.innerHTML = 'Updating Data ..'
        }, 2000);
        setTimeout(() => {
            textrecording.innerHTML = 'Your data has been changed'
            nama.textContent = composerName.value
            song.textContent = songName.value
            totalTunes.textContent = `${soundtrack[id].length} Tunes`
            nama.style.color = "green"
            nama.style.fontSize = "x-large"
            song.style.fontSize = "x-large"
            song.style.fontSize = "x-large"
            song.style.color = "green"
            totalTunes.style.color = "green"
        }, 4000);
    }
    setTimeout(() => {
        nama.style.fontSize = "large"
        song.style.fontSize = "large"
        totalTunes.style.fontSize = "large"
        nama.style.color = "black"
        song.style.color = "black"
        totalTunes.style.color = "black"
        textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
    }, 7000)
    recordingToggle.style.display = "block"
    textrecording.style.display = "block"
    composerName.remove = "lebar";
    songName.style.remove = "lebar";
    soundTrackName.style.remove = "lebar";
    btnUpdate.style.display = "none"
    soundTrackName.style.display = "none"
}


function deleteList() {
    textrecording.innerHTML = "DELETE IN PROGRESS!"
    setTimeout(() => {
        this.parentNode.remove()
        textrecording.innerHTML = 'Your Data Has Been Deleted.'
    }, 2000);
    setTimeout(() => {
        textrecording.innerHTML = 'CLICK HERE TO START RECORDING'
    }, 4000);
}

let sound = (key) => {
    audio.src = `src/${key}.wav`
    audio.play()

    let diKlik = document.querySelector(`[data-key="${key}"]`)
    diKlik.classList.add("active")
    setInterval(() => {
        diKlik.classList.remove("active")
    }, 700)
}






