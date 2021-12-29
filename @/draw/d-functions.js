function colorToCode(text){
    switch (text){
        case 'red':
            result = '#d30000'
            break
        case 'orange':
            result = '#ff3c00'
            break
        case 'yellow':
            result = '#ffa600'
            break
        case 'green':
            result = '#00be2f'
            break
        case 'gray':
            result = '#505050'
            break
        case 'cyan':
            result = '#00d9ff'
            break
        case 'blue':
            result = '#0050fd'
            break
        case 'indigo':
            result = '#1500cf'
            break
        case 'purple':
            result = '#8c00ff'
            break
        case 'pink':
            result = '#ff00bf'
            break
        default:
            result = '#ffffff'
            break
    }
    return result
}

function Resize(){
    for (let i=0; i<Tag('canvas').length; i++){
        let canvas = Tag('canvas')[i]
        canvas.width = S
        canvas.height = S
    }
}

function resizeSols(){
    for (let i=0; i<Class('solution').length; i++){
        let canvas = Class('solution')[i]
        canvas.width = S
        canvas.height = S
    }
}

function newID(){
    ID = string(floor(random(90)+10)) + string(floor(random(90)+10)) + string(floor(random(90)+10))
    Id('id').innerHTML = ID
    Id('name').value = ''
    //Clear()
    clearCanvases()
    SET = {
        id: ID,
        name: "unknown",
        problems: [],
        tags: []
    }
    console.log("ID: " + ID)
}

function clearCanvases(){
    for (let i=0; i<Class('input').length; i++){
        let iCanvas = Class('input')[i]
        let oCanvas = Class('output')[i]
        let input = iCanvas.getContext('2d')
        let output = oCanvas.getContext('2d')
        input.clearRect(0,0,iCanvas.width,iCanvas.height)
        output.clearRect(0,0,oCanvas.width,oCanvas.height)
    }
}

function drawLine(stroke, ctx){
    for (let i=0; i<stroke.points.length-1; i++){
        let p = stroke.points[i]
        let n = stroke.points[i+1]
        if (i == 0){
            ctx.lineWidth = 8
            ctx.strokeStyle = stroke.color
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
        }else{
            ctx.lineTo(n.x, n.y)
            ctx.stroke()
        }
    }
}

function drawProblems(){
    clearCanvases()
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        if (i < 3 && Id(`input-${i+1}`) != undefined){
            drawFile(obj, Id(`input-${i+1}`), Id(`output-${i+1}`))
        }else{
            drawInput(obj, Id(`problem-${i-2}`))
        }
    }
}

function Modal(message){
    let text = Id('modal-text')
    Class('lds-ellipsis')[0].style.display = 'None'
    Id('modal').style.background = 'red'
    text.innerHTML = message
    text.style.padding = '15px'
    text.style.color = 'None'
}

function drawFile(file, iCanvas, oCanvas){
    let input = iCanvas.getContext('2d')
    let output = oCanvas.getContext('2d')
    iCanvas.width = S
    iCanvas.height = S
    oCanvas.width = S
    oCanvas.height = S
    for (let i=0; i<file.length; i++){
        let elem = file[i]
        let arr = [input, output]
        if (elem.stage == 1){
            arr = [output]
        }
        for (let j=0; j<arr.length; j++){
            let ctx = arr[j]
            drawStroke(elem, ctx)
        }
    }
}

function drawInput(file, canvas){
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if (file){
        for (let i=0; i<file.length; i++){
            let elem = file[i]
            if (elem.stage == 0){
                drawStroke(elem, ctx)
            }
        }
    }
}

function drawStroke(elem, ctx){
    ctx.lineWidth = 5
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'white'
    if (Array.isArray(elem.rgb)){
        ctx.strokeStyle = `rgb(${elem.rgb[0]},${elem.rgb[1]},${elem.rgb[2]})`
    }else{
        ctx.strokeStyle =  `${elem.rgb}`
    }
    if (elem.disabled == 1){
        return
    }
    switch (elem.type){
        case 'line':
            ctx.beginPath()
            ctx.moveTo(elem.start[0], elem.start[1])
            ctx.lineTo(elem.end[0], elem.end[1])
            ctx.stroke()
            ctx.closePath()
            break
        case 'rect':
            ctx.strokeRect(elem.point[0], elem.point[1], elem.width, elem.height)
            break
        case 'polygon':
            ctx.beginPath()
            for (let i=0; i<elem.points.length; i++){
                let p = elem.points[i]
                if (i == 0){
                    ctx.moveTo(p[0], p[1])
                }else{
                    ctx.lineTo(p[0], p[1])
                }
            }
            ctx.lineTo(elem.points[0][0], elem.points[0][1])
            ctx.stroke()
            ctx.closePath()
            break
        case 'polyline':
            ctx.beginPath()
            for (let i=0; i<elem.points.length; i++){
                let p = elem.points[i]
                if (i == 0){
                    ctx.moveTo(p[0], p[1])
                }else{
                    ctx.lineTo(p[0], p[1])
                }
            }
            ctx.stroke()
            ctx.closePath()
            break
        case 'path':
            let str = ''
            for (let i=0; i<elem.commands.length; i++){
                let c = elem.commands[i]
                for (let j=0; j<c.length; j++){
                    str += `${c[j]} `
                }
            }
            let path = new Path2D(str)
            ctx.stroke(path)
            break
        case 'circle':
            ctx.beginPath()
            ctx.arc(elem.center[0], elem.center[1], elem.radius, 0, Math.PI*2)
            ctx.stroke()
            ctx.closePath()
            break
        case 'ellipse':
            ctx.beginPath()
            ctx.ellipse(elem.center[0], elem.center[1], elem.radii[0], elem.radii[1], 0, 0, Math.PI*2)
            ctx.stroke()
            ctx.closePath()
            break
    }
}

function Back(){
    Files = []
    STAGE = 0
}

function Message(msg){
    let d = Id('message')
    d.innerHTML = msg
    d.style.top = '10px'
    setTimeout(()=>{
        d.style.top = '-70px'
    }, 2000)
}

function strokesToList(strokes){
    if (strokes == undefined){
        return ''
    }
    let RESULT = `[`
    for (let i=0; i<strokes.length; i++){
        let stroke = strokes[i]
        RESULT +=
        `{"color": "${stroke.color}","z": ${stroke.z}, "points": [`
        for (let j=0; j<stroke.points.length; j++){
            let p = stroke.points[j]
            RESULT += `{"x": ${p.x}, "y": ${p.y}}`
            if (j < stroke.points.length-1){
                RESULT += ', '
            }
        }
        RESULT += ']}'
        if (i <strokes.length-1){
            RESULT += ', '
        }
    }
    RESULT += ']'
    return RESULT
}

function addToSet(){
    SET.problems = []
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        SET.problems.push(objectToList(obj))
    }
    SET.solutions = []
    for (let i=0; i<Solutions.length; i++){
        let obj = Solutions[i]
        SET.solutions.push(strokesToList(obj))
    }
}

function Select(index){
    Save()
    for (let i=0; i<Class('problem-row').length; i++){
        let p = Class('problem-row')[i]
        if (i == index){
            p.classList.add('selected')
        }else{
            p.classList.remove('selected')
        }
    }
    SELECTED = index
    if (Solutions[SELECTED] != undefined){
        Strokes = Solutions[SELECTED]
    }else{
        Strokes = []
    }
    let prob = SET.problems[3+SELECTED]
    if (typeof prob == 'string'){
        prob = parse(prob)
    }
    drawInput(prob, Id('canvas'))
}

function processProblems(){
    Strings = localStorage.getItem('svg').split('!,')
    Jsons = []
    for (let i=0; i<Strings.length; i++){
        if (i == Strings.length-1 ){
            Strings[i] = Strings[i].substring(0, Strings[i].length-1)
        }
        if (Strings[i].length > 0){
            Strings[i] = parse(Strings[i])
            Strings[i].problems = parse(Strings[i].problems.replaceAll("'", "\""))
            Jsons.push(Strings[i])
        }
    }
}

function fullStock(){
    for (let i=0; i<SET.problems.length-3; i++){
        if (Solutions[i] == undefined || Solutions[i].length < 1){
            return false
        }
    }
    return true
}

function dist(a,b){
    return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
}

function Save(){
    Solutions[SELECTED] = Strokes
}

function trim(arg){
    return arg.split(" ").join("")
}

function findMatch(id){
    fetchSVG(1000)
    processProblems()
    let s
    if (id == undefined || id.length != 6 || isNaN(id)){
        Message('Invalid ID')
        Id('loading').style.display = 'None'
        return false
    }
    id = parse(id)
    for (let i=0; i<Jsons.length; i++){
        let p = Jsons[i]
        if (p.id == id){
            s = p
        }
    }
    setTimeout(()=>{
        if (s != null){
            SET = s
            if (SET.solutions == undefined){
                SET.solutions = []
            }
            Objects = s.problems
            if (typeof s.problems[0] == 'string'){
                problems = []
                for (let i=0; i<s.problems.length; i++){
                    problems.push(parse(s.problems[i]))
                }
                Objects = problems
            }
            ID = s.id
            tags = ``
            if (s.tags != undefined){
                tags = parse(s.tags)
                for (let i=0; i<tags.length; i++){
                    let tag = tags[i]
                }
            }
            Id('name').value = s.name
            Id('id').innerHTML = s.id
            localStorage.setItem('tries', 0)
            console.log("ID (retrieved): " + ID)
            Id('loading').style.display = 'None'
            return true
        }else{
            if (localStorage.getItem('tries') == null){
                localStorage.setItem('tries', 0)
                location.reload()
            }else{
                localStorage.setItem('tries', parse(localStorage.getItem('tries'))+1)
                console.log('Try #' + localStorage.getItem('tries'))
                if (parse(localStorage.getItem('tries')) < 6){
                    location.reload()
                }else{
                    localStorage.setItem('tries', 0)
                    Message('Invalid ID')
                    Id('loading').style.display = 'None'
                }
            }
            return false
        }
    },500)
}