let Files = []
let Objects = []
let Jsons = []
let Solutions = []
let SELECTED = 0
let STAGE = 0
let ID;
let SET = {
    id: ID,
    name: "unnamed",
    description: "",
    notes: "",
    problems: [],
    solutions: [],
    tags: []
}
newID()

var editor = CodeMirror.fromTextArea(Id('description'), {
    lineNumbers: true,
    smartIndent: false,
    lineWrapping: true,
    mode: 'python',
    theme: 'dracula',
});

editor.on('change',generateTags);

//fetchSVG(1000)
//processProblems()

// load existing id
if (window.location.search.length > 6){
    let s = window.location.search
    let searchID = s.substring(4)
    findMatch(searchID)
    setTimeout(()=>{
        Select(0)
        drawProblems()
        generateTags()
    }, 500)
}else{
    Id('loading').style.display = 'None'
}


for (let i=0; i<Tag('canvas').length; i++){
    let c = Tag('canvas')[i]
    c.width = S
    c.height = S
}

function Resize(){
    Canvas.width = S
    Canvas.height = S
    for (let i=0; i<Tag('canvas').length; i++){
        let c = Tag('canvas')[i]
        c.width = S
        c.height = S
    }
}

function filesToObjects(){
    Objects=[]
    for (let i=0; i<Files.length; i++){
        let file = Files[i]
        Objects.push(fileToObject(file))
    }
    console.log('Converted Files[] To Objects[]')
}


function drawProblems(){
    clearCanvases()
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        if (Id(`input-${i+1}`) != undefined){
            drawFile(obj, Id(`input-${i+1}`), Id(`output-${i+1}`))
        }
    }
}

function scaleObjects(factor){
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        scaleObject(obj,factor)
    }
}

function Clear(){
    Files = []
    Objects = []
    SET.problems = []
    Id('elems').innerHTML = ''
    Id('object').innerHTML = ''
    for (let i=0; i<Tag('canvas').length; i++){
        let canvas = Tag('canvas')[i]
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0,0,canvas.width, canvas.height)
    }
}

function Select(i){
    let row = Class('row')[i]
    if (i < Objects.length){
        for (let j=0; j<Class('row').length; j++){
            let other = Class('row')[j]
            other.classList.remove('selected')
        }
        row.classList.add('selected')
        SELECTED = i
        Log(Objects[SELECTED])
        addToSet()
    }
}

function Back(){
    Files = []
    STAGE = 0
}

function Submit(){
    if (Id('file').value.length > 0){
        let list = Id('file').files
        for (let i=0; i<list.length; i++){
            let file = list[i]
            let reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                Files.push(`'${reader.result}'`)
                console.log(reader.result)
            }
        }
        setTimeout(()=>{
            filesToObjects()
            scaleObjects(5)
            Select(0)
            drawProblems()
        }, 100)
    }else{
        alert('please select a file')
    }
}

function Message(msg){
    let d = Id('message')
    d.innerHTML = msg
    d.style.top = '10px'
    setTimeout(()=>{
        d.style.top = '-60px'
    }, 2000)
}

function Save(){
    let string = objectToList(Objects[SELECTED])
    Id('object').innerHTML = annotate(string.substring(1,string.length-1))
    if (Objects.length > 0){
        let html = htmlToObject()
        if (html.length > 0){
          Objects[SELECTED] = html
        }
    }
    Message("Saved")
    addToSet()
    showColors()
    drawProblems()
}

// Interaction
Id('upload').onclick = () =>{
    if (SET.problems.length < 3){
        alert('Please enter at least 3 examples.')
    }else if (SET.name.length < 1){
        alert('Please enter a name.')
    }else{
        generateTags()
        addToSet()
        uploadProblem(SET, "svg")
    }
}
Id('search').onclick = () => {
    Search(Id('searchbox').value)
}
Id('save').onclick = Save
Id('file').onchange = Submit
Id('new').onclick = newID
Id('clear').onclick = Clear

for (let i=0; i<Class('row').length; i++){
    let row = Class('row')[i]
    row.onclick = () => {
        Select(i)
    }
}

Id('name').oninput = () => {
    if (Id('name').value.length > 0){
        SET.name = Id('name').value
    }
}

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'Enter':
            Search(Id('searchbox').value)
            break
        case 's':
            Save()
            break
    }
});

// Sortable
var sortable = Sortable.create(Id('elems'),{
    animation: 150,
    dragoverBubble: false,
    handle: '.title'
});

let SVGLoop = () => {
    window.requestAnimationFrame(SVGLoop)
}
window.requestAnimationFrame(SVGLoop)