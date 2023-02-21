const submit = document.querySelector("#submit");
const honeypot = document.querySelector("#work-email");

honeypot.oninput = function () {
  if (honeypot.value.length > 0) {
    submit.disabled = true;
  }
};
