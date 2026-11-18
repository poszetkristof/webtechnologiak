const container = document.getElementById("container");

// új .item div a konténer végére, sorszámmal
function addItem() {
  const item = document.createElement("div");
  item.className = "item";
  item.textContent = container.children.length + 1; // eddigi elemek száma + 1
  container.appendChild(item);
}

// minden vissza a kezdőállapotba
function reset() {
  // 1. az elemek törlése
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // 2. a stílusok törlése ("" = nincs beállítva, az alapérték érvényes)
  container.style.flexDirection = "";
  container.style.justifyContent = "";
  container.style.alignItems = "";
  container.style.flexWrap = "";
  // 3. a listák vissza (unset)-re
  document.getElementById("flex-direction-select").value = "";
  document.getElementById("justify-content-select").value = "";
  document.getElementById("align-items-select").value = "";
  document.getElementById("flex-wrap-select").value = "";
}

// event.target.value = a kiválasztott <option> value-ja
// JS-ben a kötőjeles CSS-név camelCase: flex-direction -> flexDirection
function changeFlexDirection(event) {
  const value = event.target.value;
  container.style.flexDirection = value;
}

function changeJustifyContent(event) {
  const value = event.target.value;
  container.style.justifyContent = value;
}

function changeAlignItems(event) {
  const value = event.target.value;
  container.style.alignItems = value;
}

function changeFlexWrap(event) {
  const value = event.target.value;
  container.style.flexWrap = value;
}

// függvénynév zárójel nélkül: nem most futtatjuk, hanem kattintáskor / változáskor
document.getElementById("add-item-btn").addEventListener("click", addItem);
document.getElementById("reset-btn").addEventListener("click", reset);
document
  .getElementById("flex-direction-select")
  .addEventListener("change", changeFlexDirection);
document
  .getElementById("justify-content-select")
  .addEventListener("change", changeJustifyContent);
document
  .getElementById("align-items-select")
  .addEventListener("change", changeAlignItems);
document
  .getElementById("flex-wrap-select")
  .addEventListener("change", changeFlexWrap);
