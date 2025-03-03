document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("container");
  const toggleButton = document.getElementById("toggleButton");

  toggleButton.addEventListener("click", () => {
    container.classList.toggle("active");
  });
});