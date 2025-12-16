function secretSanta(names) {
  let givers = [...names];
  let receivers = [...names];
  receivers.sort(() => Math.random() - 0.5);

  for (let i = 0; i < givers.length; i++) {
    if (givers[i] === receivers[i]) {
      let swapIndex = (i + 1) % givers.length;
      [receivers[i], receivers[swapIndex]] = [receivers[swapIndex], receivers[i]];
    }
  }

  let assignments = {};
  for (let i = 0; i < givers.length; i++) {
    assignments[givers[i]] = receivers[i];
  }
  return assignments;
}

// Initialize assignments once
function initSanta() {
  const names = ["Lupe", "Kim", "Maria", "Diego", "Miguel", "Victor", "Kax", "Dany", "Elaishah", "Marie"];
  let saved = localStorage.getItem("secretSantaAssignments");
  if (!saved) {
    const result = secretSanta(names);
    localStorage.setItem("secretSantaAssignments", JSON.stringify(result));
  }
  loadWishes();
}

function lookupSanta() {
  const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
  const saved = JSON.parse(localStorage.getItem("secretSantaAssignments"));

  if (!inputName) {
    document.getElementById("output").textContent = "Please enter your name.";
    return;
  }

  // Normalize keys from saved assignments
  const normalized = {};
  for (let key in saved) {
    normalized[key.toLowerCase()] = saved[key];
  }

  if (normalized[inputName]) {
    document.getElementById("output").textContent =
      `${capitalize(inputName)}, you are giving a gift to → ${normalized[inputName]}`;
  } else {
    document.getElementById("output").textContent =
      "Name not found in the list. Please check spelling.";
  }
}

function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
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

window.onload = initSanta;