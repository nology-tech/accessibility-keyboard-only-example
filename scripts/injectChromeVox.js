function injectChromeVox(frame) {
  var templates = document.querySelectorAll("template");
  var frameHead = frame.contentDocument.head;
  var frameBody = frame.contentDocument.body;

  var i = 0;
  function appendNext() {
    var template = templates[i++];
    if (!template) return;

    var clone = frame.contentDocument.importNode(template.content, true);
    var firstElementChild = clone.firstElementChild;
    if (
      (firstElementChild.tagName === "SCRIPT" &&
        firstElementChild.hasAttribute("src")) ||
      (firstElementChild.tagName === "LINK" &&
        firstElementChild.hasAttribute("href"))
    ) {
      firstElementChild.onload = appendNext;
    } else {
      window.setTimeout(appendNext, 0);
    }
    switch (template.className) {
      case "head":
        frameHead.appendChild(clone);
        return;
      case "start":
        frameBody.insertBefore(clone, frameBody.firstElementChild);
        return;
      case "end":
        frameBody.appendChild(clone);
        return;
    }
  }
  appendNext();
}
var frame = document.getElementById("flight-booking");
frame.addEventListener("load", injectChromeVox.bind(null, frame));
