const socket = io("http://" + window.location.hostname + ":2565");
const input = document.getElementById("chatbutton");
const text = document.getElementById("chattext");
const name = prompt("What is your Nickname?");

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
        "                        </div>\n" +
        "                    </div>";
    $('#chatbox').append(text);
};

function addChat(name, message){
    const text = "<div class=\"media w-50 mb-3\">\n" +
        "                        <div class=\"bg-light rounded py-2 px-3 mb-2\">\n" +
        "                            <p class=\"text-small mb-0 text-muted\"><b>" + name + "</b>:</p>\n" +
        "                            <div class=\"media-body ml-3\">\n" +
        "                                <p class=\"text-small mb-0 text-muted\">" + message + "</p>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>";
    $('#chatbox').append(text);
};