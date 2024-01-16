document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");

  if (errorModal) {
    errorModal.classList.add("hidden");

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-glyph") && !event.target.classList.contains("activated-heart")) {
        mimicServerCall()
          .then(() => {
            event.target.classList.add("activated-heart");
            event.target.innerHTML = FULL_HEART;
          })
          .catch(() => {
            errorModal.classList.remove("hidden");
            const errorMessage = document.getElementById("modal-message");
            errorMessage.textContent = "Error: Server request failed";

            setTimeout(() => {
              errorModal.classList.add("hidden");
            }, 3000);
          });
      } else if (event.target.classList.contains("like-glyph") && event.target.classList.contains("activated-heart")) {
        event.target.classList.remove("activated-heart");
        event.target.innerHTML = EMPTY_HEART;
      }
    });
  } else {
    console.error("Error: Could not find modal element with id 'modal'");
  }
});

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
