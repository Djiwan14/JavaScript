function delegate(parent, child, when, what) {
    function eventHandlerFunction(event) {
        let eventTarget = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if (eventHandler.contains(closestChild)) {
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}
const basic = document.querySelector('#basic')
const enter = document.querySelector('#entermediate')
const advanced = document.querySelector('#advanced')
const table = document.querySelector('table')
let playerName = document.querySelector('#name')
let launch_screen = document.querySelector('#display')
let display_name = document.querySelector('#main')

let elem = document.createElement('p')
let inpName = document.createElement('span')
let text = document.createTextNode("Player : ")
elem.appendChild(text)
elem.appendChild(inpName)
elem.style.textAlign = "center"
elem.style.fontSize = "30px"
elem.style.background = "Red"

//first button
let button = document.createElement("button")
button.innerText = 'Basic'
button.style.height = '30px'
document.body.appendChild(button)
button.style.background = "yellow"

//second button
let button2 = document.createElement("button")
button2.innerText = 'Intermediate'
button2.style.height = '30px'
document.body.appendChild(button2)
button2.style.background = "yellow"

//third button
let button3 = document.createElement("button")
button3.innerText = 'Advanced'
button3.style.height = '30px'
document.body.appendChild(button3)
button3.style.background = "yellow"

//fourth button
let restart = document.createElement("button")
restart.innerText = 'Restart'

//fifth button
let restartIntermediate = document.createElement("button")
restartIntermediate.innerText = 'Restart'

//sixth button
let restartAdvanced = document.createElement("button")
restartAdvanced.innerText = 'Restart'

//empty name cannot be entered
let buttonns = [button, button2, button3]
for (let i = 0; i < buttonns.length; i++) {
    buttonns[i].addEventListener('click', () => {
        if (playerName.value == "") {
            alert("PLEASE ENTER A PLAYER'S NAME");
        } else {
            if (i == 0) {
                createGameTable()
            } else if (i == 1) {
                createGameTableIntermediate()
            } else {
                createGameTableAdvanced()
            }
        }
    })
}

//function to change display
function changeDisplay() {
    var hide = document.getElementById('display');
    if (hide.style.display === "none") {
        hide.style.display = "block"
        button.style.display = "block"
        button2.style.display = "block"
        button3.style.display = "block"
    } else {
        hide.style.display = "none"
        button.style.display = "none"
        button2.style.display = "none"
        button3.style.display = "none"
    }
}


/* Functions to restart the game*/
function restart_game() {
    changeDisplay()
    createGameTable()
}

function restart_game_Intermediate() {
    changeDisplay()
    createGameTableIntermediate()
}

function restart_game_Advanced() {
    changeDisplay()
    createGameTableAdvanced()
}

restart.addEventListener('click', restart_game)

const board = {
    easy: [
        [0, 0, 0, -3, 0, 0, 0],
        [0, -2, 0, 0, 0, -4, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [-1, 0, 0, -1, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, -4, 0],
        [0, 0, 0, -5, 0, 0, 0]
    ],
    intermediate: [
        [0, 0, -2, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [-1, 0, -1, 0, -5, 0, -1],
        [0, 0, 0, -3, 0, 0, 0],
        [-4, 0, -1, 0, -1, 0, -1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, -1, 0, -4, 0, 0]
    ],
    advanced: [
        [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -5, 0, -4, 0, -1],
        [0, -2, -1, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
        [0, -3, 0, 0, -1, -3, -1, 0, 0, 0],
        [0, 0, 0, -1, -1, -1, 0, 0, -5, 0],
        [0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
        [0, 0, -3, 0, 0, 0, 0, -2, -1, 0],
        [-5, 0, -1, 0, -2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, -2, 0]
    ]
}

//basic table
function createGameTable() {
    changeDisplay();
    document.body.appendChild(elem)
    inpName.innerHTML = playerName.value
    table.innerHTML = ''
    const state = board.easy;
    for (let row = 0; row < state.length; row++) {
        const newTR = document.createElement('tr')
        for (let col = 0; col < state[row].length; col++) {
            const newTD = document.createElement('td')
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.dataset.value = state[row][col]
            if (state[row][col] < 0) {
                newTD.classList.add('black')
                if (state[row][col] < -1) {
                    newTD.innerHTML = -(state[row][col] + 2)
                }
            } else if (state[row][col] == 1) {
                newTD.innerHTML = '💡'
            }
            newTD.addEventListener('click', (event) => {
                const value = parseInt(event.target.dataset.value)
                if (value < 0) {
                    return
                }
                if (value == 1) {
                    event.target.dataset.value = 0;
                    event.target.innerText = '';
                } else {
                    event.target.dataset.value = 1;
                    event.target.innerText = '💡'
                }
                putLights();
            })
            newTR.appendChild(newTD)
        }
        table.appendChild(newTR)
    }
    document.body.appendChild(restart)
    restart.style.background = "yellow"
    restart.addEventListener('click', restart_game)
}

//intermediate table
function createGameTableIntermediate() {
    changeDisplay();
    document.body.appendChild(elem)
    inpName.innerHTML = playerName.value
    table.innerHTML = ''
    const state = board.intermediate;
    for (let row = 0; row < state.length; row++) {
        const newTR = document.createElement('tr')
        for (let col = 0; col < state[row].length; col++) {
            const newTD = document.createElement('td')
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.dataset.value = state[row][col]
            if (state[row][col] < 0) {
                newTD.classList.add('black')
                if (state[row][col] < -1) {
                    newTD.innerHTML = -(state[row][col] + 2)
                }
            } else if (state[row][col] == 1) {
                newTD.innerHTML = '💡'
            }
            newTD.addEventListener('click', (event) => {
                const value = parseInt(event.target.dataset.value)
                if (value < 0) {
                    return
                }
                if (value == 1) {
                    event.target.dataset.value = 0;
                    event.target.innerText = '';
                } else {
                    event.target.dataset.value = 1;
                    event.target.innerText = '💡'
                }
                putLights();
            })
            newTR.appendChild(newTD)
        }
        table.appendChild(newTR)
    }
    document.body.appendChild(restartIntermediate)
    restartIntermediate.style.background = "yellow"
    restartIntermediate.addEventListener('click', restart_game_Intermediate)
}

//advanced table
function createGameTableAdvanced() {
    changeDisplay();
    document.body.appendChild(elem)
    inpName.innerHTML = playerName.value
    table.innerHTML = ''
    const state = board.advanced;
    for (let row = 0; row < state.length; row++) {
        const newTR = document.createElement('tr')
        for (let col = 0; col < state[row].length; col++) {
            const newTD = document.createElement('td')
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.dataset.value = state[row][col]
            if (state[row][col] < 0) {
                newTD.classList.add('black')
                if (state[row][col] < -1) {
                    newTD.innerHTML = -(state[row][col] + 2)
                }
            } else if (state[row][col] == 1) {
                newTD.innerHTML = '💡'
            }
            newTD.addEventListener('click', (event) => {
                const value = parseInt(event.target.dataset.value)
                if (value < 0) {
                    return
                }
                if (value == 1) {
                    event.target.dataset.value = 0;
                    event.target.innerText = '';
                } else {
                    event.target.dataset.value = 1;
                    event.target.innerText = '💡'
                }
                putLights();
            })
            newTR.appendChild(newTD)
        }
        table.appendChild(newTR)
    }
    document.body.appendChild(restart)
    restart.style.background = "yellow"
    restart.addEventListener('click', restart_game_Advanced)
}

function putLights() {
    let hasErrors = false;
    document.querySelectorAll('.light').forEach(e => e.classList.remove('light'))
    for (const bulb of document.querySelectorAll('[data-value="1"]')) {
        const row = parseInt(bulb.dataset.rowIndex)
        const col = parseInt(bulb.dataset.colIndex)
        for (let i = row; i >= 0; i--) {
            const td = document.querySelector(`[data-row-index="${i}"][data-col-index="${col}"]`);
            const value = parseInt(td.dataset.value);
            if (value < 0) break
            if (i != row && value == 1) {console.log(td); hasErrors = true}
            td.classList.add('light')
        }
        for (let i = row + 1; i < document.querySelectorAll('tr').length; i++) {
            const td = document.querySelector(`[data-row-index="${i}"][data-col-index="${col}"]`);
            const value = parseInt(td.dataset.value);
            if (value < 0) break
            if (value == 1) {console.log(td); hasErrors = true}
            td.classList.add('light')
        }
        for (let i = col + 1; i < document.querySelectorAll('tr').length; i++) {
            const td = document.querySelector(`[data-row-index="${row}"][data-col-index="${i}"]`);
            const value = parseInt(td.dataset.value);
            if (value < 0) break
            if (value == 1) {console.log(td); hasErrors = true}
            td.classList.add('light')
        }
        for (let i = col - 1; i >= 0; i--) {
            const td = document.querySelector(`[data-row-index="${row}"][data-col-index="${i}"]`);
            const value = parseInt(td.dataset.value);
            if (value < 0) break
            if (value == 1) {console.log(td); hasErrors = true}
            td.classList.add('light')
        }
    }
    console.log(hasErrors);
    hasErrors = hasErrors || document.querySelectorAll('td:not(.light):not(.black)').length > 0
    hasErrors = hasErrors || check_black_tiles()
    if (!hasErrors) {
        alert('You won!')
        
    }
}

function check_black_tiles() {
    let hasErrors = false;
    for (const black of document.querySelectorAll('.black')) {
        const value = parseInt(black.dataset.value)
        const row = parseInt(black.dataset.rowIndex)
        const col = parseInt(black.dataset.colIndex)
        const required = -value - 2
        if (required < 0) continue
        const bulbs = [
            document.querySelector(`[data-row-index="${row - 1}"][data-col-index="${col}"][data-value="1"]`),
            document.querySelector(`[data-row-index="${row + 1}"][data-col-index="${col}"][data-value="1"]`),
            document.querySelector(`[data-row-index="${row}"][data-col-index="${col - 1}"][data-value="1"]`),
            document.querySelector(`[data-row-index="${row}"][data-col-index="${col + 1}"][data-value="1"]`),
        ]
        if (bulbs.filter(e => e).length != required) {
            hasErrors = true
            break
        }
    }
    return hasErrors
}