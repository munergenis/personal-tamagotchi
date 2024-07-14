const tamaDisplay = document.getElementById("tama-display")
const toggleBtn = document.getElementById("toggle")
const selectBtn = document.getElementById("select")
const cancelBtn = document.getElementById("cancel")
const menuIcons = document.querySelectorAll(".menu-icon")

const stageEnum = {
  egg: "egg",
  baby: "baby",
  child: "child",
  teenage: "teenage",
  adult: "adult",
  special: "special"
}
const typeEnum = {
  male: "male",
  female: "female"
}
const foodEnum = {
  meal: "meal",
  snack: "snack"
}

// const menu = {
//   options: [
//     {
//       action: "feed",
//       active: false
//     },
//     {
//       action: "light",
//       active: false
//     },
//     {
//       action: "play",
//       active: false
//     },
//     {
//       action: "heal",
//       active: false
//     },
//     {
//       action: "clean",
//       active: false
//     },
//     {
//       action: "stats",
//       active: false
//     },
//     {
//       action: "discipline",
//       active: false
//     }
//   ],
//   needs: {
//     active: false
//   }
// }

const menu = {
  main: ["feed", "light", "play", "heal", "clean", "stats", "discipline"],
  feed: ["meal", "snack"],
  light: ["on", "off"],
  play: "play",
  heal: "heal",
  clean: "clean",
  stats: "stats",
  discipline: "discipline",
}

class Tama {
  constructor() {
    this.type = getRandomType()
    this.stage = stageEnum.egg

    this.hunger = 4
    this.maxHunger = 6

    this.isSleepy = false
    this.isLightOn = true

    this.happy = 4
    this.maxHappy = 6
    
    this.health = 4
    this.maxHealth = 4

    this.isSick = false
    this.isDead = false

    this.poo = []

    this.weight = 0
    this.age = 0

    this.rebel = this.getRebel()
    this.discipline = 0

    // TODO: Mirar care mistakes
  }

  getRebel() {
    // Calcular rebeldia de forma random con factor de desviación dependiendo de la disciplina que se la haya aplicado (a más disciplina aplicada, menos posibilidades de que tenga estado rebelde).

    let rebelFactor

    if (this.stage === stageEnum.egg)
      rebelFactor = 0
    else if (this.discipline === 0)
      rebelFactor = 0.20
    else if (this.discipline === 1)
      rebelFactor = 0.16
    else if (this.discipline === 2)
      rebelFactor = 0.12
    else if (this.discipline === 3)
      rebelFactor = 0.08
    else if (this.discipline === 4)
      rebelFactor = 0.04
    
    const rebel = Math.random() < rebelFactor

    return rebel
  }

  feed(type) {
    if (this.stage === stageEnum.egg) return

    if (type === foodEnum.meal) {
      if (this.hunger < this.maxHunger) {
        eatAnimation()
        this.hunger += 1
        this.weight += 1
      } else {
        sayNoAnimation()
      }
    }
  }
}

// FUNCTIONS
function getRandomType() {
  const type = Math.random() < 0.5 ? typeEnum.male : typeEnum.female

  return type
}

function eatAnimation() {
  // TODO: manage animation
  console.log("<<...eating...>>")
}

function sayNoAnimation() {
  // TODO: manage animation
  console.log("NO!")
}

function toggleTimeScreen() {
  tamaDisplay.textContent = new Date().toLocaleTimeString()
}

// HELPER FUNCTIONS
function timedAction(time, action) {
  const timerID = setTimeout(() => {
    action()
  }, time);

  return timerID
}

// APP INIT
let currentMenu = "main"
let currentIndex = -1
let timers = []

tamaDisplay.textContent = "HELLO TAMA!"

// const tama = new Tama()

// setTimeout(() => {
//   tama.stage = stageEnum.egg
//   tamaDisplay.textContent = "Egg"

//   setTimeout(() => {
//     tamaDisplay.textContent = "Hatched!"
    
//     setTimeout(() => {
//       tama.stage = stageEnum.baby
//       tama.hunger = 1
//       tama.happy = 1

//       tamaDisplay.innerText = `
//         Stage: ${tama.stage}
//         Hunger: ${tama.hunger}
//         Happy: ${tama.happy}
//       `
      
//     }, 2000);
//   }, 5000);
// }, 2000);


// EVENT LISTENERS
toggleBtn.addEventListener("click", handleToggle)
selectBtn.addEventListener("click", handleSelect)

// HANDLERS (EVENTS)
function handleToggle() {
  // menuIndex++
  
  // if (timers.length) {
  //   clearTimeout(timers[0])
  //   timers.shift()
  // }

  // if (menuIndex >= menu.options.length) {
  //   menu.options[menuIndex - 1].active = false
  //   menuIcons[menuIndex - 1].style.color = "transparent"
  //   menuIndex = -1
  //   return
  // }

  // timerID = timedAction(5000, () => {
  //   menuIndex = -1

  //   menu.options.forEach(option => option.active = false)
  //   menuIcons.forEach(icon => icon.style.color = "transparent")
  //   timers.shift()
  // })

  // timers.unshift(timerID)

  // const menuOption = menu.options[menuIndex].action

  // menu.options.forEach(option => {
  //   if (option.action === menuOption) {
  //     option.active = true
  //   } else {
  //     option.active = false
  //   }
  // })

  // menuIcons.forEach(icon => {
  //   if (icon.id === menuOption) {
  //     icon.style.color = "white"
  //   } else {
  //     icon.style.color = "transparent"
  //   }
  // })

  currentIndex++

  if (currentIndex >= menu[currentMenu].length) {
    if (currentMenu === "main") {
      currentIndex = -1
    } else {
      currentIndex = 0
      console.log(menu[currentMenu][currentIndex])
    }

    return
  }

  console.log(menu[currentMenu][currentIndex])
}
function handleSelect() {
  // if (menuIndex < 0) {
  //   toggleTimeScreen()
  //   return
  // }

  if (currentIndex < 0) {
    tamaDisplay.textContent = "HELLO TAMA!"
    return 
  }

  const optionSelected = menu[currentMenu][currentIndex]

  currentMenu = menu[currentMenu][currentIndex]
  currentIndex = 0

  if (menu[currentMenu]) {
    console.log(menu[currentMenu])
  } else {
    handleAction(optionSelected)
    currentMenu = "main"
    currentIndex = -1
    setTimeout(() => {
      tamaDisplay.textContent = "HELLO TAMA!"
    }, 2000);
  }
}

function handleAction(action) {
  tamaDisplay.textContent = `making action: ${action}`
}