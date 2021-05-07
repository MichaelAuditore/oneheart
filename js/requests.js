$(document).ready(init);

const REQUEST_URL = "https://one-heart.herokuapp.com";
const COVID_API = "https://corona.lmao.ninja/v2/all";
let messages = {};

function init() {
  getMessages();
  getCOVIDdata();
}

/** Draw messages */
function drawMessages() {
  Object.keys(messages).map((msg) => {
    const article = [
      `<article class="post-card ${messages[msg].id}">` +
        '<h2 class="hide-heading">Post</h2>' +
        "<section>" +
        "<blockquote>" +
        '<q cite="message">' +
        `<i>${messages[msg].message}</i>` +
        "</q>" +
        `<footer>- ${messages[msg].name} -</footer>` +
        "</blockquote>" +
        "</section>" +
        "</article>",
    ];
    $(".posts").append(article.join(""));
  });
}
/**
 * Get All Messages
 */
function getMessages() {
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${REQUEST_URL}/messages`, headers)
    .then((data) => data.json())
    .then((data) => {
      messages = data["messages"];
      drawMessages();
    });
}

/**
 * Post a message
 */
function postMessage() {
  const name = $("#name").val();
  const message = $("#message").val();

  if (name === "" || message === "") {
    return;
  }
  const headers = {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name, message: message }),
  };

  fetch(`${REQUEST_URL}/messages`, headers)
    .then((resp) => resp.json())
    .then((resp) => {
      $("#name").val("");
      $("#message").val("");
      location.reload();
    });
}

function getCOVIDdata() {
  fetch(COVID_API)
    .then((resp) => resp.json())
    .then((resp) => {
      drawModal(resp);
    });
}

function drawModal(response) {
  Object.keys(response).map((resp) => {
    const article = [
      "<tr>" + `<td>${resp}</td>` + `<td>${response[resp]}</td>` + "</tr>",
    ];
    $(".tbody").append(article.join(""));
  });
}

function openModal() {
  $(".modal").removeClass("closed");
  $(".modal").addClass("open");
  $(".notice").removeClass("closed");
  $(".notice").addClass("open");
}

function closeModal() {
  $(".modal").removeClass("open");
  $(".modal").addClass("closed");
  $(".notice").removeClass("open");
  $(".notice").addClass("closed");
}
