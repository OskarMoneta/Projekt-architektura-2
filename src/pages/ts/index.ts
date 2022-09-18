import { regs } from "./regs"

const saveBtn = document.querySelector<HTMLButtonElement>('[data-save]')
const randomBtn = document.querySelector<HTMLButtonElement>('[data-random]')
const clearBtn = document.querySelector<HTMLButtonElement>('[data-clear]')
const moveBtn = document.querySelector<HTMLButtonElement>('[data-move]')
const exchangeBtn = document.querySelector<HTMLButtonElement>('[data-exchange]')

const inputs = document.querySelectorAll<HTMLInputElement>('[data-input]')
const outputs = document.querySelectorAll<HTMLDivElement>('[data-output]')

function init() {
  saveBtn?.addEventListener('click', () => {
    save()
    update()
    consoleRegs('save')
  })

  randomBtn?.addEventListener('click', () => {
    random()
    update()
    consoleRegs('random')
  })

  clearBtn?.addEventListener('click', () => {
    clear()
    update()
    consoleRegs('clear')
  })

  moveBtn?.addEventListener('click', () => {
    const fromTo = getFromTo()

    move(fromTo)
    update()
    consoleRegs('move')
  })

  exchangeBtn?.addEventListener('click', () => {
    const fromTo = getFromTo()

    exchange(fromTo)
    update()
    consoleRegs('move')
  })
}

init()

function save() {
  Object.keys(regs).forEach((key, i) => {
    regs[key] = inputs[i].value ? addZeros(inputs[i].value) : regs[key];
    inputs[i].value = ''
  })
}

function random() {
  for (const reg in regs) {
    regs[reg] = genRanHex(8)
  }
}

function clear() {
  for (const reg in regs) {
    regs[reg] = '00000000'
  }
}

function update() {
  outputs?.forEach(output => {
    const key = output.dataset.output

    output.innerText = regs[key]
  })
}

function move(fromTo: fromTo) {
  regs[fromTo.to] = regs[fromTo.from]
}

function exchange(fromTo: fromTo) {
  const temp = regs[fromTo.to]

  regs[fromTo.to] = regs[fromTo.from]
  regs[fromTo.from] = temp
}

type fromTo = {
  from: string,
  to: string
}

function getFromTo(): fromTo {
  const from = document.querySelector<HTMLSelectElement>('[data-select="from"]')
  const to = document.querySelector<HTMLSelectElement>('[data-select="to"]')

  return {
    from: from?.value as string,
    to: to?.value as string
  }
}

const addZeros = (val: string): string => Array(8 - val.length).fill(0).join('') + val

const genRanHex = (size: number): string => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

function consoleRegs(msg: string) {
  console.log(
    `${msg}: \n` + Object.keys(regs).map(val => {
      return ` ${val}: ${regs[val]}`
    }).join('\n')
  )
}