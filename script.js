import { Tama } from "./Tama.js"

// DOM ELEMENTS
const tamaDisplay = document.getElementById("tama-display")
const toggleBtn = document.getElementById("toggle")
const selectBtn = document.getElementById("select")
const cancelBtn = document.getElementById("cancel")
const menuIcons = [...document.querySelectorAll(".menu-icon")]

// INIT TAMA
const Tama1 = new Tama(tamaDisplay)
Tama1.egg()

// INIT MENU
let menuIndex = -1
let maxIndex = Tama1.menu.length - 1
let selectedOption = null
let isHiddenTimeScreen = true

// MENU FUNCTIONS
function handleToggleMenu() {
  if (!isHiddenTimeScreen || Tama1.stageIndex === 0) return

  if (menuIndex >= maxIndex) {
    menuIndex = selectedOption ? 0 : -1
  } else {
    menuIndex++
  }

  if (!selectedOption) {
    updateMenuIcon()
  }
}

function handleAction() {
  if (menuIndex < 0) {
    isHiddenTimeScreen = Tama1.toggleTimeScreen(isHiddenTimeScreen)
    return
  } 
  
  if (!selectedOption) {
    selectedOption = Tama1.menu[menuIndex]
    menuIndex = 0
  } else {
    selectedOption = selectedOption.options[menuIndex]
  }

  console.log("selected: " + selectedOption.id)

  if (selectedOption.options) {
    maxIndex = selectedOption.options.length - 1
    
    console.log(`Options: ${maxIndex + 1}\n${selectedOption.options.map(opt => opt.id).join("\n")}`)
  } else {
    selectedOption.action()

    clearMenuIcons()
    menuIndex = -1
    selectedOption = null
    maxIndex = Tama1.menu.length - 1
  }
}

function handleCancelMenu() {
  clearMenuIcons()

  menuIndex = -1
  maxIndex = Tama1.menu.length - 1
  selectedOption = null
}

function updateMenuIcon() {
  clearMenuIcons()

  if (menuIndex !== -1) {
    menuIcons[menuIndex].style.color = "white"
  }
}

function clearMenuIcons() {
  menuIcons.forEach(icon => icon.style.color = "transparent")
}

toggleBtn.addEventListener("click", handleToggleMenu)
selectBtn.addEventListener("click", handleAction)
cancelBtn.addEventListener("click", handleCancelMenu)
