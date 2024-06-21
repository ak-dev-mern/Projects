const inputTags = document.querySelector(".input-tags");
const input = document.querySelector(".input-tags input");
const closebtn = document.querySelector(".close");
const copybtn = document.querySelector(".copy");

let tags = [];

function reset() {
  const tagElements = document.querySelectorAll(".tag");
  tagElements.forEach((tag) => {
    tag.parentElement.removeChild(tag);
  });
}

closebtn.addEventListener("click", function () {
  tags = [];
  reset();
});

copybtn.addEventListener("click", function () {
  const tags = inputTags.querySelectorAll(".tag span");
  let = tagsArray = [];
  tags.forEach((span) => tagsArray.push(span.textContent));
  copyToClipboard(tagsArray.toString());
});

function copyToClipboard(text) {
  const element = document.createElement("textarea");
  element.value = text;
  document.body.appendChild(element);
  element.select();
  document.execCommand("Copy");
  document.body.removeChild(element);

  let obj = document.styleSheets[1].cssRules[12];
  obj.style.content = '"Copied"';
  setTimeout(() => {
    obj.style.content = '"Copy"';
  }, 2000);
}

function createTag(tag) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  const span = document.createElement("span");
  span.innerHTML = tag;
  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", "close-circle-outline");
  icon.setAttribute("data-item", tag);
  div.appendChild(span);
  div.appendChild(icon);
  return div;
}

function addTags() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      inputTags.prepend(createTag(tag));
    });
}

document.addEventListener("click", function (e) {
  if (e.target.tagName == "ION-ICON") {
    const data = e.target.getAttribute("data-item");
    const filterTags = tags.filter((tag) => {
      return tag != data;
    });
    tags = filterTags;
    addTags();
  }
});

input.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const data = input.value.trim();
    if (data.includes(",")) {
      const list_of_tags = data.split(",");
      // list_of_tags.forEach((element) => {
      //   console.log(createTag(element));
      // });
      tags.push(...list_of_tags);
    } else {
      // console.log(createTag(data));
      tags.push(data);
    }
    tags = [...new Set(tags)];
    input.value = "";
    addTags();
  }
});