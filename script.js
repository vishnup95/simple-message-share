const messageForm = document.querySelector("form");
const messageLink = document.querySelector(".link");
const copyBtn = document.querySelector("#copy-btn");
const root = document.querySelector("#root");
const title = document.querySelector(".title");
const messageFormSection = document.querySelector(".message-form-container");
const secretMessage = document.querySelector(".secret-message");
const resetLink = document.querySelector(".reset-link");

function setClipboard(text) {
	const type = "text/plain";
	const blob = new Blob([text], { type });
	try {
		const data = [new ClipboardItem({ [type]: blob })];
		navigator.clipboard.write(data).then(function () {
			window.M.toast({
				html: "Copied to clipboard",
				classes: "toast-clipboard",
			});
		});
	} catch (err) {
		window.M.toast({
			html: `${err}`,
			classes: "red",
		});
	}
}

messageForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const encodedMessage = btoa(e.target[0].value);
	const urlParams = new URLSearchParams();
	urlParams.set("message", encodedMessage);
	messageLink.value = window.location.href + "?" + urlParams;
});

window.onload = function () {
	const urlParams = new URLSearchParams(window.location.search);
	const encodedMessage = urlParams.get("message");
	root.classList.toggle("hide");
	if (encodedMessage) {
		messageForm.classList.add("hide");
		title.innerHTML = "Your Secret Message is";
		const decodedMessage = atob(encodedMessage);
		secretMessage.classList.remove("hide");
		secretMessage.textContent = decodedMessage;
		resetLink.classList.remove("hide");
		resetLink.href = window.location.origin + window.location.pathname;
	}
};

copyBtn.addEventListener("click", function () {
	setClipboard(messageLink.value);
});
