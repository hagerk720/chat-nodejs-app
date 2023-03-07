const socket = io();
const clientsTotal = document.querySelector("#clients-total");
const messageContainer = document.querySelector("#message-container");
const nameInput = document.querySelector("#name-input");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("clients-total", (d) => {
  clientsTotal.innerHTML = `total clients : ${d}`;
});

socket.on("chat-message", (data) => {
  addMsg(false, data);
});
function sendMessage() {
  if (messageInput.value == "") return;
  let data = {
    name: nameInput.value,
    msg: messageInput.value,
    date: new Date(),
  };
  socket.emit("message", data);
  addMsg(true, data);
  messageInput.value = "";
}
function addMsg(isOwn, data) {
  let html = ` <li class="${isOwn ? "message-right" : "message-left"}">
 <p class="message">
   ${data.msg}
   <span> sended by ${data.name}</span>
 </p>
</li>`;
  messageContainer.insertAdjacentHTML("beforeend", html);
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}
