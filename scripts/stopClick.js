document
  .querySelector(".click-stealer")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  });
