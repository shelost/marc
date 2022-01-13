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
    description: "",
    problems: [],
    solutions: [],
    tags: []
}
fetchSVG(1000)
processProblems()

if (window.location.search.length > 6){
    let s = window.location.search
    let searchID = s.substring(4,s.length)
    findMatch(searchID)
    setTimeout(()=>{
        processSolutions()
        drawProblems()
    }, 1000)
}else{
    Id('loading').style.display = 'None'
    Message('Please enter an ID.')
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
        for (let j=0; j<Class('color').length; j++){
            Class('color')[j].classList.remove('active')
        }
        c.classList.add('active')
    }
}

let ReviewLoop = () => {

    window.requestAnimationFrame(ReviewLoop)
}
window.requestAnimationFrame(ReviewLoop)
