let Files = []
let Objects = []
let Jsons = []
let Solutions = []
let SELECTED = 0
let STAGE = 0
let COLOR = 'red'
let ID
let SET = {
    id: ID,
    name: "unknown",
    problems: [],
    solutions: [],
    tags: []
}
newID()

fetchSVG(1000)
processProblems()

if (window.location.search.length > 6){
    let s = window.location.search
    let searchID = s.substring(4,s.length)
    findMatch(searchID)
    setTimeout(()=>{
        Select(0)
        drawProblems()
    }, 500)
}

function objectToList(list){
    let RESULT = `[`
    for (let i=0; i<list.length; i++){
        let el = list[i]
        RESULT += tostr(el)
        if (i < list.length-1){
            RESULT += ', '
        }
    }
    RESULT += `]`
    return RESULT
}

function Search(searchID){
    window.location.search = 'id=' + searchID
}

for (let i=0; i<Tag('canvas').length; i++){
    let c = Tag('canvas')[i]
    c.width = S
    c.height = S
}

// Interaction
Id('search').onclick = () => {
    Search(Id('searchbox').value)
}

for (let i=0; i<Class('problem-row').length; i++){
    let row = Class('problem-row')[i]
    row.onclick = () => {
        if (SET.problems.length > i+3){
            addToSet()
            Select(i)
        }
    }
}

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 's':
            Save()
            break
    }
});

///////////////////////////////////////////////////////

let MX = 0, MY = 0
let Strokes = []
let MOUSEDOWN = false
let ONSCREEN = false
const CANVAS = Id('canvas')
const CTX = CANVAS.getContext('2d')
let RECT = CANVAS.getBoundingClientRect()

window.addEventListener('mousemove', mousemove)
window.addEventListener('mousedown', draw)
window.addEventListener('mouseup', mouseup)
Id('undo').onclick = undo
Id('clear').onclick = clear
Id('save').onclick = Save
Id('upload').onclick = () => {
    Save()
    addToSet()
    console.log(SET)
    console.log(Solutions)
    if (fullStock()){
        uploadProblem(SET)
    }else{
        alert('Please provide solutions for all of the given problems.')
    }
}
window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'Enter':
            Search(Id('searchbox').value)
            break
        case 'z':
            undo()
            break
        case 'u':
            undo()
            break
        case 'c':
            clear()
            break
        case "Escape":
            undo()
            break
    }
});

for (let i=0; i<Class('color').length; i++){
    let c = Class('color')[i]
    c.onclick = () => {
        COLOR = c.id.substring(2, c.id.length)
        console.log(COLOR)
        for (let j=0; j<Class('color').length; j++){
            Class('color')[j].classList.remove('active')
        }
        c.classList.add('active')
    }
}

function mousemove(e){
    MX = e.clientX
    MY = e.clientY
    ratio = S/RECT.width
    EX = (MX-RECT.left)*ratio
    EY = (MY-RECT.top)*ratio
    if (MOUSEDOWN){
        draw()
    }
}

// Detect mouseup
function mouseup(){
    MOUSEDOWN = false
}

function undo(){
    if (Strokes.length > 0){
        Strokes.pop()
    }
    MOUSEDOWN = false
}

function clear(){
    Strokes = []
}

// Place points for stroke
function draw(){
    if (ONSCREEN){
        if (!MOUSEDOWN){
            Strokes.push({
                color: colorToCode(COLOR),
                points: [],
                z: 0
            })
        }
        MOUSEDOWN = true
        let point = {x: Math.round(EX), y: Math.round(EY)}
        if (Strokes[Strokes.length-1].points.length > 0){
            let last = Strokes[Strokes.length-1].points[Strokes[Strokes.length-1].points.length-1]
            if (dist(point, last) > 30){
                Strokes[Strokes.length-1].points.push(point)
            }
        }else{
            Strokes[Strokes.length-1].points.push(point)
        }
    }
}

let DrawLoop = () => {
    CTX.clearRect(0,0,CANVAS.width, CANVAS.height)
    let prob = SET.problems[3+SELECTED]
    if (typeof prob == 'string'){
        prob = parse(prob)
    }
    drawInput(prob, Id('canvas'))
    for (let i=0; i<Strokes.length; i++){
        let stroke = Strokes[i]
        drawLine(stroke, CTX)
    }
    if (MX > RECT.left && MX < RECT.left+RECT.width &&
        MY > RECT.top && MY < RECT.top+RECT.height){
        ONSCREEN = true
    }else{
        ONSCREEN = false
    }
    window.requestAnimationFrame(DrawLoop)
}
window.requestAnimationFrame(DrawLoop)