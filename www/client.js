const socket = io("http://" + window.location.hostname + ":80");
const input = document.getElementById("chatbutton");
const text = document.getElementById("chattext");
const name = prompt("What is your Nickname?");

const d = new Date();

socket.emit('login', name);

socket.on("chat-message", message => {
    addChat(message.name, message.message);
});

socket.on('login', message => {
    addChat("Connect", `<b>${message}<b/> has joined!`);
});

socket.on('logout', message => {
    addChat("Disconnect", `<b>${message}</b> has left!`)
})

socket.on('users', message => {
    $('#users').empty();
    message.forEach(user => {
    $('#users').append(`<p>${user}</p>`);
    })
})

input.addEventListener('click', event => {
  event.preventDefault();
  if(text.value != "") {
      const message = text.value;
      socket.emit("send-chat-message", message);
      text.value = "";
      addlocalChat(message);
  }
});

function addlocalChat(message){
    const text = "<div class=\"media w-50 ml-auto mb-3\">\n" +
        "                        <div class=\"media-body\">\n" +
        "                            <div class=\"bg-primary rounded py-2 px-3 mb-2\">\n" +
        "                                <p class=\"text-small mb-0 text-white\">" + message + "</p>\n" +
        "                            </div>\n" +
        "                            <p class=\"small text-muted\">" + d.getHours() + ":" + d.getMinutes() + " | " + d.getDate() + "." + (d.getMonth() + 1) + "</p>" +
        "                        </div>\n" +
        "                    </div>";
    $('#chatbox').append(text);
}

function addChat(name, message){
    const text = "<div class=\"media w-50 mb-3\">\n" +
        "                        <div class=\"bg-light rounded py-2 px-3 mb-2\">\n" +
        "                            <p class=\"text-small mb-0 text-muted\"><b>" + name + "</b>:</p>\n" +
        "                            <div class=\"media-body ml-3\">\n" +
        "                                <p class=\"text-small mb-0 text-muted\">" + message + "</p>\n" +
        "                            </div>\n" +
        "                            <p class=\"small text-muted\">" + d.getHours() + ":" + d.getMinutes() + " | " + d.getDate() + "." + (d.getMonth() + 1) + "</p>" +
        "                        </div>\n" +
        "                    </div>";
    $('#chatbox').append(text);
}