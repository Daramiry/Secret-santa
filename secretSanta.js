// Initialize assignments once
function initSanta() {
  // New randomized assignments for everyone
  const assignments = {
    "Lupe": "Victor",
    "Kim": "Marie",
    "Maria": "Elaishah",
    "Diego": "Miguel",
    "Miguel": "Kax",
    "Victor": "Maria",
    "Kax": "Dany",
    "Dany": "Kim",
    "Elaishah": "Lupe",
    "Marie": "Diego"
  };

  // Save once so lookupSanta can use it
  localStorage.setItem("secretSantaAssignments", JSON.stringify(assignments));

  loadWishes();
}


function lookupSanta() {
  const inputName = document.getElementById("nameInput").value.trim();
  const saved = JSON.parse(localStorage.getItem("secretSantaAssignments"));

  if (!inputName) {
    document.getElementById("output").textContent = "Please enter your name.";
    return;
  }

  if (saved[inputName]) {
    document.getElementById("output").textContent =
      `${inputName}, you are giving a gift to → ${saved[inputName]}`;
  } else {
    document.getElementById("output").textContent =
      "Name not found in the list. Please check spelling.";
  }
}

function saveWish() {
  const name = document.getElementById("nameInput").value.trim();
  const wish = document.getElementById("wishInput").value.trim();

  if (!name || !wish) {
    alert("Please enter both your name and a wish.");
    return;
  }

  let wishes = JSON.parse(localStorage.getItem("secretSantaWishes")) || {};

  if (!wishes[name]) {
    wishes[name] = [];
  }

  wishes[name].push(wish);
  localStorage.setItem("secretSantaWishes", JSON.stringify(wishes));

  loadWishes();
}

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem("secretSantaWishes")) || {};
  const container = document.getElementById("wishList");
  if (!container) return; // skip if element doesn't exist on this page
  container.innerHTML = "";

  for (let person in wishes) {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${person}</h3>`;

    const ul = document.createElement("ul");
    wishes[person].forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item + " ";

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteWish(person, index);

      li.appendChild(delBtn);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    container.appendChild(section);
  }
}

function deleteWish(name, index) {
  let wishes = JSON.parse(localStorage.getItem("secretSantaWishes")) || {};
  if (wishes[name]) {
    wishes[name].splice(index, 1);
    if (wishes[name].length === 0) {
      delete wishes[name];
    }
    localStorage.setItem("secretSantaWishes", JSON.stringify(wishes));
    loadWishes();
  }
}


function resetAssignments() {
  // Clear assignments and wishes
  localStorage.removeItem("secretSantaAssignments");
  localStorage.removeItem("secretSantaWishes");

  // Confirm to the user
  alert("Assignments and wishes have been reset. Please reload the page.");

  // Optionally reload automatically:
  // location.reload();
}


window.onload = initSanta;