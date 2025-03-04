document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("container");
  const toggleButton = document.getElementById("toggleButton");

  toggleButton.addEventListener("click", () => {      //switch 
    container.classList.toggle("active");
  });
});
