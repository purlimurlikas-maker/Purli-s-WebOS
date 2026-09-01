// Make the DIV elements draggable (only if they exist):
['welcome', 'about', 'TianaSPalaceApp', 'TianaSPalaceAppwindow'].forEach(id => {
  const el = document.getElementById(id);
  if (el) dragElement(el);
});

let biggestIndex = 100;

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.getElementById("welcome");
var welcomeScreenClose = document.getElementById("welcomeclose");
var welcomeScreenOpen = document.getElementById("welcomeopen");
if (welcomeScreenClose && welcomeScreen) {
  welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
  });
}
if (welcomeScreenOpen && welcomeScreen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
  });
}


var aboutScreen = document.getElementById("about");
var aboutScreenClose = document.getElementById("aboutclose");
var aboutScreenOpen = document.getElementById("aboutopen");
if (aboutScreenClose && aboutScreen) {
  aboutScreenClose.addEventListener("click", function() {
    closeWindow(aboutScreen);
  });
}
if (aboutScreenOpen && aboutScreen) {
  aboutScreenOpen.addEventListener("click", function() {
    openWindow(aboutScreen);
  });
}







var selectedIcon;

function selectIcon(el) {
  if (!el) return;
  el.classList.add("selected");
  selectedIcon = el;
}

function deselectIcon(el) {
  if (!el) return;
  el.classList.remove("selected");
  if (selectedIcon === el) selectedIcon = undefined;
}

// Scope app icon clicks to the apps container to prevent interfering with other windows
const appsContainer = document.getElementById('TianaSPalaceApp');
if (appsContainer) {
  appsContainer.addEventListener('click', function (e) {
    const iconImg = e.target.closest('.tiana-app-icon');
    const appName = e.target.closest('.app-name');
    let appContainer = null;
    if (iconImg) appContainer = iconImg.parentElement;
    else if (appName) appContainer = appName.parentElement;
    else appContainer = e.target.closest('.tiana-app');
    if (!appContainer) return;
    if (selectedIcon === appContainer) deselectIcon(appContainer);
    else { if (selectedIcon) deselectIcon(selectedIcon); selectIcon(appContainer); }
  });
}

const tianaSPalaceApp = document.getElementById("TianaSPalaceApp");
const tianaSPalaceAppClose = document.getElementById("TianaSPalaceAppclose");
if (tianaSPalaceAppClose && tianaSPalaceApp && typeof closeWindow === 'function') {
  tianaSPalaceAppClose.addEventListener("click", () => closeWindow(tianaSPalaceApp));
}

 
var TianaSPalaceAppwindow = document.getElementById("TianaSPalaceAppwindow");
var TianaSPalaceAppwindowClose = document.getElementById("TianaSPalaceAppwindowclose");
var TianaSPalaceAppwindowOpen = document.getElementById("TianaSPalaceAppwindowopen");
if (TianaSPalaceAppwindowClose && TianaSPalaceAppwindow) {
  TianaSPalaceAppwindowClose.addEventListener("click", function() {
    closeWindow(TianaSPalaceAppwindow);
  });
}
if (TianaSPalaceAppwindowOpen && TianaSPalaceAppwindow) {
  TianaSPalaceAppwindowOpen.addEventListener("click", function() {
    openWindow(TianaSPalaceAppwindow);
  });
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element));
}

var topBar = document.querySelector("#top");

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  if (topBar) topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

function openWindow(element) {
  if (!element) return;
  if (getComputedStyle(element).display !== 'none') return;
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  if (topBar) topBar.style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
  if (!element) return;
  element.style.display = "none";
}

var tianaAppWindow = document.getElementById("TianaSPalaceAppwindow");
var tianaAppIcon = document.getElementById("TianaSPalaceApp");
var tianaAppClose = document.getElementById("TianaSPalaceAppwindowclose");

if (tianaAppIcon && tianaAppWindow) {
  tianaAppIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    openWindow(tianaAppWindow);
  });
}

if (tianaAppClose && tianaAppWindow) {
  tianaAppClose.addEventListener("click", function() {
    closeWindow(tianaAppWindow);
  });
}


