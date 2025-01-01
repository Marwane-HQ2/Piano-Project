Tone.start()
const synth = new Tone.Synth().toDestination();

const piano = document.getElementById("piano")
const table_notes = [261, 277, 311, 329, 349, 369, 415, 440, 466, 493]
const table_notes_name = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do_', 're_', 'l']
const touches_notes = {
    "Q": 0,
    "S": 1,
    "D": 2,
    "F": 3,
    "G": 4,
    "H": 5,
    "J": 6,
    "K": 7,
    "L": 8,
    "M": 9
}

play_functions = []
stop_functions = []

for (let i=0; i < table_notes.length;i++) {
    let element = document.createElement("div")
    element.classList = "tile"
    element.id = `tile${i+1}`
    element.style.gridArea = table_notes_name[i]
    element.innerHTML = `Tile ${i+1}`
    let play_tile = function () {
        synth.triggerAttack(table_notes[i])
        element.style.backgroundColor = "#dfdfb7"
    }
    let stop = function () {
        synth.triggerRelease()
        element.style.backgroundColor = "#fcfcd0"
    }

    play_functions.push(play_tile)
    stop_functions.push(stop)
    
    element.addEventListener("pointerdown", play_tile)
    element.addEventListener("pointerup", stop)
    

    piano.appendChild(element)
}

let key_down = function (event) {
    e = event.key.toUpperCase()
    if (e) {
        synth.triggerAttack(table_notes[touches_notes[e]])
        element = document.getElementById(`tile${touches_notes[e]+1}`)
        console.log(element)
        element.style.backgroundColor = "#dfdfb7"
    }

}

let key_up = function (event) {
    synth.triggerRelease()
    e = event.key.toUpperCase()
    if (touches_notes[e] || touches_notes[e] == 0) {
        element = document.getElementById(`tile${touches_notes[e]+1}`)
        element.style.backgroundColor = "#fcfcd0"
    }
    
}
document.body.addEventListener("keydown", key_down)
document.body.addEventListener("keyup", key_up)

// MODIFIER LA NOTE 

const input_range = document.getElementById("note")
input_range.value = 0
input_range.addEventListener("input", change_note)
let list_tiles = piano.children

function change_note() {
    add = Math.round(input_range.value)
    for (let i=0; i<list_tiles.length; i++) {
        child = list_tiles[i]
        child.removeEventListener("pointerdown", play_functions[i])
        child.removeEventListener("pointerup", stop_functions[i])
        
        let play_tile = function () {
            synth.triggerAttack(table_notes[i] + add)
            list_tiles[i].style.backgroundColor = "#dfdfb7"
        }
        let stop = function () {
            synth.triggerRelease()
            list_tiles[i].style.backgroundColor = "#fcfcd0"
        }

        child.addEventListener("pointerdown", play_tile)
        child.addEventListener("pointerup", stop)

        play_functions[i] = play_tile
        stop_functions[i] = stop
    }
    document.body.removeEventListener("keydown", key_down)
    document.body.removeEventListener("keyup", key_up)

    key_down = function (event) {
        e = event.key.toUpperCase()
        if (touches_notes[e] || touches_notes[e] == 0) {
            synth.triggerAttack(table_notes[touches_notes[e]] + add)
            element = document.getElementById(`tile${touches_notes[e]+1}`)
            element.style.backgroundColor = "#dfdfb7"
        }
    }

    key_up = function (event) {
        synth.triggerRelease()
        e = event.key.toUpperCase()
        if (touches_notes[e] || touches_notes[e] == 0) {
            element = document.getElementById(`tile${touches_notes[e]+1}`)
            element.style.backgroundColor = "#fcfcd0"
        }
    }
    document.body.addEventListener("keydown", key_down)
    document.body.addEventListener("keyup", key_up)
}