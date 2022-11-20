set();

const addListButton = document.getElementById("addListButton");
const toDoTitleTextBox = document.getElementById("toDoTitleTextBox");
const toDoList = document.getElementById("toDoList");
const date = new Date();

var listIndex = 0;
var toDoTitles = []

addListButton.addEventListener("click", function() {
    Array.from(toDoList.getElementsByTagName("li")).forEach(function(item) {
        toDoTitles.push(item.innerText);
    });

    if (toDoTitles.includes(`${toDoTitleTextBox.value} - ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`)) {
        document.getElementsByTagName("p")[0].setAttribute("style", "color: red; display: block;");
        addListButton.disabled = true;
        setTimeout(() => {
            document.getElementsByTagName("p")[0].setAttribute("style", "display: none;");
            addListButton.disabled = false;
        }, 1000);
    } else {
        document.getElementsByTagName("p")[0].setAttribute("style", "display: none;");
        var newList = document.createElement("li");
        newList.setAttribute("id", `list-${listIndex += 1}`);
        newList.innerText = toDoTitleTextBox.value;

        newList.addEventListener("click", function() {
            newList.remove();
            save();
        });

        var span = document.createElement("span");
        span.setAttribute("style", "color: gray;");
        span.innerText = ` - ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        
        newList.appendChild(span);
        toDoList.appendChild(newList);
    }

    save();
});

toDoTitleTextBox.addEventListener("input", function(e) {
    if (e.target.value.length >= 4) {
        addListButton.disabled = false;
    } else {
        addListButton.disabled = true;
    }
});

function save() {
  localStorage.setItem("html", document.body.innerHTML)
}

function set() {
  const content = localStorage.getItem("html")
  if (content) {
    document.body.innerHTML = content
  }
}