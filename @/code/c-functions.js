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

            drawObject(elem, ctx)
        }
    }
}

function drawObject(elem, ctx) {
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

        let props = ['type', 'stage', 'output', 'disabled', 'points', 'point',
        'center', 'width', 'height', 'start', 'end', 'radius', 'rgb', 'commands']

        for (let i=0; i<props.length; i++){
            let prop = props[i]
            if (!(text.includes('points') && prop == 'point')) {
                text = text.replaceAll(prop, `<br> <span class='property' style='color:${obj.rgb}'>${prop}</span>`)
            }
        }

        text = text.substring(5)

        string += text
    }

    return string
}

function Log() {

    let str = [``,``,``]

    for (let i = 0; i < Objects[SELECTED].length; i++){
        let obj = Objects[SELECTED][i]
        let n = obj.stage
        str[n] += drawElem(obj, i)
    }

    let valid_sol = false

    if (typeof Z == 'object' &&
        Z.length > 0 &&
        Z[0].type &&
        Z[0].rgb) {
        valid_sol = true
    }

    Id('input').innerHTML = str[0]
    Id('output').innerHTML = str[1]

    for (let i = 0; i < Objects[SELECTED].length; i++) {
        let obj = Objects[SELECTED][i]

        let canvas = Id(`obj-${i}`)
        let ctx = canvas.getContext('2d')

        drawObject(obj, ctx)
    }

    // solutions

    if (valid_sol) {

        for (let i = 0; i < Z.length; i++){
            let obj = Z[i]
            str[2] += drawElem(obj, Objects[SELECTED].length+i)
        }

        Id('solution').innerHTML = str[2]

        for (let i = 0; i < Z.length; i++) {
            let obj = Z[i]
            let canvas = Id(`obj-${Objects[SELECTED].length+i}`)
            let ctx = canvas.getContext('2d')
            drawObject(obj, ctx)
        }

    }

}



function drawElem(obj, i) {
    let str =
    `
    <div class = 'object'>
    <canvas id = 'obj-${i}' class = 'obj' width = '1000' height = '1000'> </canvas>
    <div class = 'props'>
    `

    for (const prop in obj) {
        let text = JSON.stringify(obj[prop])

        let dict = {
            '[': ``,
            ']]': ``,
            '{': ``,
            '"': ``,
            ':': `<span class = 'colon'>: </span>`,
            '],': `<br>`,
            ',': `<span class = 'colon'>, </span> `,
            ']': ``,
        }

        for (const prop in dict){
            text = text.replaceAll(prop, dict[prop])
        }

        switch (prop) {
            case 'disabled':
                break
            case 'rgb':
                str +=
                `
                <div class = 'prop'>
                    <h2> ${prop}: </h2>
                    <p class = 'rgb' style = 'color: ${text}'> ${text} </p>
                </div>
                `
                break
            default:
                str +=
                `
                <div class = 'prop'>
                    <h2> ${prop}: </h2>
                    <p> ${text} </p>
                </div>
                `
                break
        }
    }

    str += `</div></div>`

    return str
}


function clearScripts() {
    for (let i = 0; i < document.head.children.length; i++){
        let div = document.head.children[i]
        if (div.tagName == 'SCRIPT' && div.src == '') {
            div.remove()
        }
    }
}


let A = null
let Z = ''

function Run() {

    let val = editor.getValue()
    let div = document.createElement('script');
    clearScripts()
    div.innerHTML = `setTimeout( (input) => { try {` + val + `}catch{ alert("oops")} }, 200)`

    try {
        Z = eval(val)
        console.log(Z)
    } catch (e){
        alert('invalid code' + e)
    }

    Log()
}

