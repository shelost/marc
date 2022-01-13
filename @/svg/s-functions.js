let test2 =
`
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <polygon points="28.16 44 36.9 86 72.58 75.97 84.06 49.57 28.16 44" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
    <rect x="143.5" y="121.5" width="36" height="36" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
    <line x1="54.56" y1="63.76" x2="159.78" y2="137.33" style="fill: none;stroke: #06f9ff;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
    <path d="M79.51,82.47s16.84-57.85,21.73,3.3-75-.55-21.73-37" style="fill: none;stroke: #06f9ff;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
    <circle cx="75.79" cy="67.74" r="36.29" style="fill: none;stroke: #06f9ff;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
    <polyline points="27.5 200.33 200.5 100.5 27.5 0.33" style="fill: none;stroke: #f3ff00;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
</svg>
`

let test =
`
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <path d="M92.2,59.63s-68.11-71.9-63.57-6.06,51,10.07,58.05-10.85" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
  <path d="M117.7,102.5s87,55.63,28.5,68.81,4.5-72.81,4.5-72.81" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
  <line x1="52.6" y1="55.26" x2="142.06" y2="148.36" style="fill: none;stroke: #06f9ff;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
  <path d="M79.7,152.5s-69-40-59-4,35,22,35,22" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
  <path d="M123.7,31.5s11,47,36,11-13.32-11-13.32-11" style="fill: none;stroke: #f50;stroke-linecap: round;stroke-linejoin: round;stroke-width: 3px"/>
</svg>
`

function abbrevProp(prop){
    switch (prop){
        case 'commands':
            return 'c'
        case 'points':
            return 'p'
        case 'point':
            return 'q'
        case 'center':
            return 'o'
        case 'width':
            return 'w'
        case 'height':
            return 'h'
        case 'stage':
            return 'output'
        case 'radius':
            return 'r'
        case 'radii':
            return "r'"
        case 'start':
            return '1'
        case 'end':
            return '2'
        case 'disabled':
            return 'disable'
        case 'c':
            return 'commands'
        case 'p':
            return 'points'
        case 'q':
            return 'point'
        case 'o':
            return 'center'
        case 'w':
            return 'width'
        case 'h':
            return 'height'
        case 'output':
            return 'stage'
        case 'r':
            return 'radius'
        case "r'":
            return 'radii'
        case '1':
            return 'start'
        case '2':
            return 'end'
        case 'rgb':
            return 'rgb'
        case 'disable':
            return 'disabled'
        default:
            return prop
    }
    return 'err'
}

function newID(){
    ID = string(floor(random(90)+10)) + string(floor(random(90)+10)) + string(floor(random(90)+10))
    Id('id').innerHTML = ID
    Id('name').value = ''
    Id('notes').value = ''
    Id('description').value = ''
    Id('object').innerHTML = ''
    Clear()
    clearCanvases()
    SET = {
        id: ID,
        name: "unknown",
        description: "",
        problems: [],
        solutions: [],
        tags: []
    }
    console.log("ID: " + ID)
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

function scaleObject(file, factor){
    for (let i=0; i<file.length; i++){
        let elem = file[i]
        switch (elem.type){
            case 'line':
                elem.start[0] = elem.start[0]*factor
                elem.start[1] = elem.start[1]*factor
                elem.end[0] = elem.end[0]*factor
                elem.end[1] = elem.end[1]*factor
                break
            case 'rect':
                elem.point[0] = elem.point[0]*factor
                elem.point[1] = elem.point[1]*factor
                elem.width = elem.width*factor
                elem.height = elem.height*factor
                break
            case 'polygon':
                for (let i=0; i<elem.points.length; i++){
                    let p = elem.points[i]
                    p[0] = p[0]*factor
                    p[1] = p[1]*factor
                }
                break
            case 'polyline':
                for (let i=0; i<elem.points.length; i++){
                    let p = elem.points[i]
                    p[0] = p[0]*factor
                    p[1] = p[1]*factor
                }
                break
            case 'path':
                for (let i=0; i<elem.commands.length; i++){
                    if (elem.commands[i][0][0] == '\"'){
                        elem.commands[i][0] = parse(elem.commands[i][0])
                    }
                    for (let j=1; j<elem.commands[i].length; j++){
                        elem.commands[i][j] = parse(elem.commands[i][j])*factor
                    }
                }
                break
            case 'circle':
                elem.center[0] = elem.center[0]*factor
                elem.center[1] = elem.center[1]*factor
                elem.radius = elem.radius*factor
                break
            case 'ellipse':
                elem.center[0] = elem.center[0]*factor
                elem.center[1] = elem.center[1]*factor
                elem.radii[0] = elem.radii[0]*factor
                elem.radii[1] = elem.radii[1]*factor
                break
        }
    }
}

function fileToObject(str){
    let el = document.createElement('html')
    el.innerHTML = str
    let s = el.getElementsByTagName('svg')[0].innerHTML
    el.innerHTML = s
    let elements = el.getElementsByTagName('*')
    let elems = []
    let STYLE = {}
    var RESULT = []

    for (let i=0; i<elements.length; i++){
        let elem = elements[i]
        if (elem.nodeName != 'HEAD' && elem.nodeName != 'STYLE' && elem.nodeName != 'BODY'){
            elems.push(elem)
        }
        if (elem.nodeName == 'STYLE'){
            let arr = elem.innerHTML.split(".st")
            arr.shift()
            for (let j=0; j<arr.length; j++){
                let css = arr[j]
                let obj = css.substring(css.indexOf('{'),css.length).replaceAll(';', '" , "').replaceAll(':', '" : "')
                let name = css.substring(0, css.indexOf('{'))
                obj = '{"' + obj.substring(1, obj.length-6) + '}'
                obj = parse(obj)
                STYLE['st' + name] = obj
            }
        }
    }
    for (let i=0; i<elems.length; i++){
        let elem = elems[i]
        let A = elem.attributes
        let stroke = elem.style.stroke
        let rgb = "black"
        if (stroke.substring(0,3) == 'rgb'){
            let s = stroke.split(', ')
            rgb = [parse(s[0].substring(4)), parse(s[1]), parse(s[2].substring(0, s[2].length-1))]
        }else{
            rgb = stroke
        }
        if (A.class != undefined){
            rgb = STYLE[A.class.value].stroke
        }
        var obj = {
            type: 'unknown',
            stage: 0,
            rgb: rgb
        }
        switch (elem.nodeName){
            case 'LINE':
                let x1 = 0, y1 = 0, x2 = 0, y2 = 0
                if (A.x1 != undefined){ x1 = round(parse(A.x1.value)) }
                if (A.y1 != undefined){ y1 = round(parse(A.y1.value)) }
                if (A.x2 != undefined){ x2 = round(parse(A.x2.value)) }
                if (A.y2 != undefined){ y2 = round(parse(A.y2.value)) }
                obj.type = 'line'
                obj.start = [x1, y1]
                obj.end = [x2, y2]
                break
            case 'RECT':
                x = round(parse(A.x.value))
                y = round(parse(A.y.value))
                width = round(parse(A.width.value))
                height = round(parse(A.height.value))
                obj.type = 'rect'
                obj.point = [x,y]
                obj.width = width
                obj.height = height
                break
            case 'POLYGON':
                obj.type = 'polygon'
                obj.points = []
                let str = A.points.value.split(' ')
                if (A.points.value.indexOf(',') != -1){
                    for (let i=0; i<str.length; i++){
                        pair = str[i].split(',')
                        if (i < str.length-1){
                            obj.points.push([round(parse(pair[0])), round(parse(pair[1]))])
                        }
                    }
                }else{
                    let str = A.points.value.split(' ')
                    for (let i=0; i<str.length; i+=2){
                        if (i < str.length-2){
                            obj.points.push([round(parse(str[i])), round(parse(str[i+1]))])
                        }
                    }
                }
                break
            case 'POLYLINE':
                obj.type = 'polyline'
                obj.points = []
                let str2 = A.points.value.split(' ')
                if (A.points.value.indexOf(',') != -1){
                    for (let i=0; i<str2.length; i++){
                        pair = str2[i].split(',')
                        if (i < str2.length-1){
                            obj.points.push([round(parse(pair[0])), round(parse(pair[1]))])
                        }
                    }
                }else{
                    let str2 = A.points.value.split(' ')
                    for (let i=0; i<str2.length; i+=2){
                        if (i < str2.length-2){
                            obj.points.push([round(parse(str2[i])), round(parse(str2[i+1]))])
                        }
                    }
                }
                break
            case 'PATH':
                obj.type = 'path'
                obj.commands = []
                let d = A.d.value
                let split = []
                let prev = 0, pos = 0
                while (pos < d.length){
                    if (pos > 0 && (d[pos]).match(/[a-z]/i) != null){
                        split.push(d.substring(prev, pos))
                        prev = pos
                    }else if (pos == d.length-1){
                        split.push(d.substring(prev, pos+1))
                    }
                    pos++
                }
                for (let i=0; i<split.length; i++){
                    let coords = []
                    let r = split[i]
                    if (r.indexOf(',') != -1 || r.indexOf('-') != -1){
                        coords = r.slice(1).split(/(?=-)|,/)
                    }
                    for (let i=0; i<coords.length; i++){
                        let num = coords[i]
                        if (typeof num == 'string' && num.indexOf('.') != num.lastIndexOf('.')){
                            let index = num.lastIndexOf('.')
                            first = num.substring(0, index)
                            second = "0." + num.substring(index+1, num.length)
                            coords[i] = round(parse(first))
                            coords.splice(i+1, 0, round(parse(second)))
                        }else{
                            coords[i] = round(num)
                        }
                    }
                    let command = [`"${r[0]}"`, ...coords]
                    obj.commands.push(command)
                }
                console.log(obj.commands)
                break
            case 'CIRCLE':
                cx = round(parse(A.cx.value))
                cy = round(parse(A.cy.value))
                r = round(parse(A.r.value))
                obj.type = 'circle'
                obj.center = [cx, cy]
                obj.radius = r
                break
            case 'ELLIPSE':
                cx = round(parse(A.cx.value))
                cy = round(parse(A.cy.value))
                rx = round(parse(A.rx.value))
                ry = round(parse(A.ry.value))
                obj.type = 'ellipse'
                obj.center = [cx, cy]
                obj.radii = [rx,ry]
                break
        }
        obj.disabled = 0
        console.log(obj)
        RESULT.push(obj)
    }
    return RESULT
}

function clearCanvases(){
    for (let i=0; i<Class('row').length; i++){
        let iCanvas = Class('input')[i]
        let oCanvas = Class('output')[i]
        let input = iCanvas.getContext('2d')
        let output = oCanvas.getContext('2d')
        input.clearRect(0,0,iCanvas.width,iCanvas.height)
        output.clearRect(0,0,oCanvas.width,oCanvas.height)
    }
}

function drawFile(file, iCanvas, oCanvas){
    let input = iCanvas.getContext('2d')
    let output = oCanvas.getContext('2d')
    input.clearRect(0,0,iCanvas.width,iCanvas.height)
    output.clearRect(0,0,oCanvas.width,oCanvas.height)
    /*
    iCanvas.style.width = '100px'
    iCanvas.style.height = '100px'
    iCanvas.style.background = 'blue'
    iCanvas.style.display = 'block'
    */
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
                break
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
    }
}

function Log(file){
    let string = objectToList(file)
    Id('elems').innerHTML = ''
    Id('object').innerHTML = annotate(string.substring(1,string.length-1))
    for (let i=0; i<file.length; i++){
        let elem = file[i]
        if (elem.disabled == undefined){
            elem.disabled = 0
        }
        let s =
        `
        <div class = 'elem'>
            <div class = 'title'>
                <p> ${i} </p>
                <h1> ${elem.type} </h1>
            </div>
            <div class = 'props'>
        `
        for (prop in elem){
            let str = abbrevProp(prop)
            if (prop != "tostr" && prop != "type"){
                // Default
                let file = ``

                switch(prop){
                    case 'rgb':
                        file = `
                        <div class = 'prop'>
                            <h2 class = 'rgb'> ${str} </h2>
                            <input type = 'text' id='${i}-${elem.type}-${prop}' value = '${elem[prop]}'>
                        </div>
                        `
                        break
                    case 'stage':
                        let checked = ''
                        if (elem[prop] == 1){
                            checked = 'checked'
                        }
                        file = `
                        <div class = 'prop'>
                            <h2 class = 'check'> ${str} </h2>
                            <input type = 'checkbox' class = 'checkbox' id='${i}-${elem.type}-${prop}' ${checked}>
                        </div>
                        `
                        break
                    case 'disabled':
                        let check = ''
                        if (elem[prop] == 1){
                            check = 'checked'
                        }
                        file = `
                        <div class = 'prop'>
                            <h2 class = 'check disabled'> ${str} </h2>
                            <input type = 'checkbox' class = 'checkbox disabled' id='${i}-${elem.type}-${prop}' ${check}>
                        </div>
                        `
                        break
                    default:
                        file =
                        `
                        <div class = 'prop'>
                            <h2> ${str} </h2>
                            <input type = 'text' id='${i}-${elem.type}-${prop}' value = '${elem[prop]}'>
                        </div>
                        `
                        break
                }
                // Array
                if (Array.isArray(elem[prop])){
                    if (elem[prop].toString().length > 15){
                        file =
                        `
                        <div class = 'prop'>
                            <h2> ${str} </h2>
                            <textarea id='${i}-${elem.type}-${prop}'>${elem[prop].join(" ")}</textarea>
                        </div>
                        `
                    }
                }
                s += file
            }
        }
        s +=
        `
        </div>
        </div>
        `
        Id('elems').innerHTML += s
    }
    showColors()
}

function showColors(){
    for (let i=0; i<Class('rgb').length; i++){
        let h2 = Class('rgb')[i]
        let elem = h2.parentElement.parentElement.parentElement
        let val = h2.parentElement.children[1].value
        let div = h2.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
        let disabled = h2.parentElement.parentElement.lastElementChild.lastElementChild.checked
        if (val.indexOf(',') != -1){
            let s = val.split(',')
            div.style.border= `1px solid rgba(${s[0]},${s[1]},${s[2]}, 1)`
        }else{
            div.style.border = `1px solid ${val}`
        }

        if (disabled == 1){
            elem.style.opacity = 0.5
        }else{
            elem.style.opacity = 1
        }
    }
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

function htmlToObject(){
    let RESULT = []
    for (let i=0; i<Class('elem').length; i++){
        let elem = Class('elem')[i]
        let type = trim(elem.firstElementChild.children[1].innerHTML)
        let obj = {
            type: type,
        }
        let disabled = elem.children[1].lastElementChild.lastElementChild.checked
        if (disabled){
            continue
        }
        for (let j=0; j<elem.children[1].children.length; j++){
            let div = elem.children[1].children[j]
            let prop = abbrevProp(trim(div.firstElementChild.innerHTML))
            let input = div.children[1]
            let val;
            if (input.type != 'checkbox'){
                val = input.value
                if (val.indexOf(',') != -1){
                    let arr = val
                    // Points
                    if (arr.indexOf(' ') != -1){
                        let points = arr.split(' ')
                        for (let k=0; k<points.length; k++){
                            let arr = points[k]
                            if (isNaN(arr[0]) && arr[0] != '-'){
                                arr = `"${points[k][0]}"` + arr.substring(1, arr.length)
                            }
                            if (arr.indexOf(',') != -1){
                                points[k] = parse('[' + arr + ']')
                            }
                        }
                        obj[prop] = points

                    // Normal List
                    }else{
                        let list = parse('[' + arr + ']')
                        obj[prop] = list
                    }
                // Not list
                }else{
                    if (!isNaN(val[0])){
                        val = parse(val)
                    }
                    obj[prop] =  val
                }
            }else{
                val = 0
                if (input.checked){
                    val = 1
                }
                obj[prop] = val
            }
        }
        RESULT.push(obj)
    }
    return RESULT
}

function annotate(input){

    let arr = parse('['+ input + ']')
    let string = ``

    for (let i=0; i<arr.length; i++){

        let obj = arr[i]
        let text = JSON.stringify(obj)

        let dict = {
            ',"disabled":0': ``,
            ',': `<span class = 'colon'>, </span> `,
            ':': `<span class = 'colon'>: </span>`,
            '[': `<span class = 'bracket'>[</span>`,
            ']': `<span class = 'bracket'>]</span>`,
            '{': ``,
            '}': `<br> <span class = 'dash'> ———— </span> <br>`,
            '"': ``,
        }

        for (const prop in dict){
            text = text.replaceAll(prop, dict[prop])
        }

        let props = ['type', 'stage', 'output', 'disabled', 'point', 'points',
        'center', 'width', 'height', 'start', 'end', 'radius', 'rgb']

        for (let i=0; i<props.length; i++){
            let prop = props[i]
            text = text.replaceAll(prop, `<span class='property' style='color:${obj.rgb}'>${prop}</span>`)
        }

        string += text
    }

    return string
}

function generateTags(){
    let val = editor.getValue()
    let elem = Id('tag')
    let tags = {}
    for (const prop in KEY){
        let words = KEY[prop]
        for (let i=0; i<words.length; i++){
            let word = words[i]
            let match = val.match(word)
            if (match && word.length > 3 && word[word.length-1] != 's'){
                if (tags[prop]){
                    if (tags[prop].indexOf(word) == -1){
                        tags[prop].push(word)
                    }
                }else{
                    tags[prop] = [word]
                }
            }
        }
    }
    for (const prop in tags){
        let words = KEY[prop]
        for (let i=0; i<words.length; i++){
            let word = words[i]
        }
    }
    elem.innerHTML = ''
    let order = ['yellow', 'pink', 'purple', 'green', 'cyan']
    let i = 0

    while (i < order.length){
        let current = order[i]
        if (tags[current]){
            if (current == 'purple'){
                elem.innerHTML += `<p class = 'tag tag-purple'> cardinal-direction </p>`
            }else{
                for (let j=0; j<tags[current].length; j++){
                    let word = tags[current][j]
                    elem.innerHTML += `<p class = 'tag tag-${current}'> ${word} </p>`
                }
            }
            i++
        }else{
            i++
        }
    }

}

function addToSet(){
    SET.problems = []
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        SET.problems.push(objectToList(obj))
    }
    SET.description = editor.getValue()
    let elem = Id('tag')
    let nodes = elem.childNodes
    let arr = []
    for (let i=0; i<nodes.length; i++){
        let node = nodes[i]
        if (node.innerHTML){
            arr.push(trim(node.innerHTML))
        }
    }
    SET.tags = string(arr)
    SET.notes = Id('notes').value
}

function addTags(){
    let elem = Id('tag')
    let nodes = elem.childNodes
    let arr = []
    for (let i=0; i<nodes.length; i++){
        let node = nodes[i]
        arr.push(trim(node.innerHTML))
    }
    SET.tags = string(arr)
}