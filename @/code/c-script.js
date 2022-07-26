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

//____________________________________ Setup ____________________________________//

// codemirror
var editor = CodeMirror.fromTextArea(Id('code'), {
    lineNumbers: true,
    smartIndent: false,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'material-palenight',
});

//editor.on('change', generateTags);

// load existing id
if (window.location.search.length > 6){
    let s = window.location.search
    let searchID = s.substring(4)
    findMatch(searchID)
    setTimeout(()=>{
        Select(0)
        drawProblems()
       // generateTags()
        //Log()
    }, 500)
}else{
    Id('loading').style.display = 'None'
}

// set canvas sizes

function setCanvases() {
    for (let i=0; i<Tag('canvas').length; i++){
        let c = Tag('canvas')[i]
        c.width = S
        c.height = S
    }
}


//____________________________________ Functions ____________________________________//


function drawProblems(){
    clearCanvases()
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        if (Id(`input-${i+1}`) != undefined){
            drawFile(obj, Id(`input-${i+1}`), Id(`output-${i+1}`))
        }
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
        addToSet()
    }
    Run()
}

function Message(msg){
    let d = Id('message')
    d.innerHTML = msg
    d.style.top = '10px'
    setTimeout(()=>{
        d.style.top = '-60px'
    }, 2000)
}


//____________________________________ Interaction ____________________________________//

/*
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
*/

Id('search').onclick = () => {
    Search(Id('searchbox').value)
}

Id('name').oninput = () => {
    if (Id('name').value.length > 0){
        SET.name = Id('name').value
    }
}

Id('run').onclick = Run

for (let i=0; i<Class('row').length; i++){
    let row = Class('row')[i]
    row.onclick = () => {
        Select(i)
    }
}

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'Enter':
            Search(Id('searchbox').value)
            break
        case 's':
            //Save()
            break
    }
});

//____________________________________ Loop ____________________________________//

let CodeLoop = () => {

    if (Objects[SELECTED]) {
       A = Objects[SELECTED].filter(obj => obj.stage == 0)
    }


    window.requestAnimationFrame(CodeLoop)
}
window.requestAnimationFrame(CodeLoop)