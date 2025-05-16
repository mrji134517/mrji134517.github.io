document.addEventListener("DOMContentLoaded", function () {
  // Image hover scaling effect
  const courseImages = document.querySelectorAll(".eraserhead img");

  courseImages.forEach((image) => {
    image.addEventListener("mouseover", function () {
      image.style.transform = "scale(1.1)";
      image.style.transition = "0.6s";
    });

    image.addEventListener("mouseout", function () {
      image.style.transform = "scale(1)";
    });
  });
});
