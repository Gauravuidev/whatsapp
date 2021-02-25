let roomID = '';
let personName = '';
let messageArea = document.getElementById('body');
var socket = io();
var input = document.getElementById("inputBody");
input.addEventListener('keyup', function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
})

function enterRoom() {
    personName = document.getElementById('enterName').value;
    if (personName !== "") {
        document.getElementsByClassName('loginDetail')[0].style.display = "none";
        document.getElementsByClassName('enterID')[0].style.display = "block";
        document.getElementsByClassName('userName')[0].innerHTML = personName;
    }
}

function createRoom() {
    personName = document.getElementById('enterName').value;
    if (personName !== "") {
        document.getElementsByClassName('loginDetail')[0].style.display = "none";
        document.getElementsByClassName('createID')[0].style.display = "block";
        document.getElementsByClassName('userName')[1].innerHTML = personName;
    }
}

function appendMessage(msg, type) {
    // Get DOM elements
    var mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `<span>${msg.name}</span> <span>${msg.text}</span>`;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

function joinRoom(data) {

    if (data == 'enter') {
        personName = document.getElementsByClassName('userName')[0].innerHTML;
        roomID = document.getElementById('enterRoomId').value;
        if(roomID !== "")
            document.getElementsByClassName('enterID')[0].style.display = "none";
    } else {
        personName = document.getElementsByClassName('userName')[1].innerHTML;
        roomID = document.getElementById('createRoomId').value;
        if(roomID !== "")
            document.getElementsByClassName('createID')[0].style.display = "none";
    }
    if(roomID !== "") {
        document.getElementById('chatting').style.display = "block";
        document.getElementById('userName').innerHTML = personName;
        document.getElementById('privateRoomID').innerHTML = roomID;
    
        // Join a channel
        var room = roomID;
        socket.emit("join", room);
        // Listen to file input events
        //sendMessage(socket);   
    }
}

function sendMessage() {
    var msg = {
        text: input.value.trim(),
        name: personName
    }
    if (msg.text !== "") {
        appendMessage(msg, 'out');
        scrollToBottom();
        input.value = '';
        socket.emit("message", msg);
    }
}

socket.on("message", function (msg) {
    console.log('msg', msg);
    appendMessage(msg, 'in');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
