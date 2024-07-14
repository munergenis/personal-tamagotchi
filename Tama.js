const foodEnum = {
  opt1: "meal",
  opt2: "snack"
}
const stagesEnum = [
  {
    id: "egg",
    props: "TODO"
  },
  {
    id: "baby",
    props: "TODO"
  }
]

export class Tama {
  constructor(displayEl) {
    this.name = "tama"

    this.displayEl = displayEl

    this.stage = stagesEnum[0].id
    this.stageIndex = 0

    this.age = 0
    this.weight = 10

    this.menu = [
      {
        id: "feed",
        options: [
          {
            id: foodEnum.opt1,
            action: () => this.feed(foodEnum.opt1)
          },
          {
            id: foodEnum.opt2,
            action: () => this.feed(foodEnum.opt2)
          }
        ]
      },
      {
        id: "light",
        options: [
          {
            id: "on",
            action: () => this.switchLights("on")
          },
          {
            id: "off",
            action: () => this.switchLights("off")
          }
        ]
      },
      {
        id: "play",
        action: () => this.play()
      },
      {
        id: "heal",
        action: () => this.heal()
      },
      {
        id: "clean",
        action: () => this.clean()
      },
      {
        id: "stats",
        action: () => this.showStats()
      },
      {
        id: "discipline",
        action: () => this.discipline()
      }
    ]

    this.currentAnimation = null
  }

  egg() {
    this.displayEl.textContent = "egg animation"

    setTimeout(() => {
      this.hatch()
    }, 2000);
  }

  hatch() {
    this.displayEl.textContent = "hatch animation"

    this.stageIndex += 1
    this.stage = stagesEnum[this.stageIndex]
  }

  // MENU ACTIONS + TOGGLE TIME SCREEN
  feed(food) {
    const message = `${this.name} is eating ${food}`

    console.log(message)
  }
  switchLights(state) {
    const message = `turning lights ${state}`

    console.log(message)
  }
  play() {
    const message = "playing with tama"

    console.log(message)
  }
  heal() {
    const message = "healing tama"

    console.log(message)
  }
  clean() {
    const message = "cleaning poops"

    console.log(message)
  }
  showStats() {
    const message = `Age: ${this.age} years\nWeight: ${this.weight} kg`

    console.log(message)
  }
  discipline() {
    const message = "aplying discipline to tama"

    console.log(message)
  }
  toggleTimeScreen(flag) {
    if (flag) {
      this.displayEl.textContent = "time is..."
    } else {
      this.displayEl.textContent = "clearing time screen"
    }

    return !flag
  }
}