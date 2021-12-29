function clearCanvases(){
    for (let i=0; i<Tag('canvas').length; i++){
        let canvas = Tag('canvas')[i]
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}

function processSolutions(){
    if (SET.solutions == undefined){
        return
    }
    let arr = []
    for (let i=0; i<SET.solutions.length;i++){
        let prob = parse(SET.solutions[i])
        arr.push(prob)
    }
    SET.solutions = arr
}

function drawSolution(file, sol, ctx){
    for (let i=0; i<file.length; i++){
        let elem = file[i]
        if (elem.stage == 0){
            drawStroke(elem, ctx)
        }
    }
    for (let i=0; i<sol.length; i++){
        let stroke = sol[i]
        drawLine(stroke, ctx)
    }
}

function drawProblems(){
    clearCanvases()
    for (let i=0; i<Objects.length; i++){
        let obj = Objects[i]
        if (i < 3 && Id(`input-${i+1}`) != undefined){
            drawFile(obj, Id(`input-${i+1}`), Id(`output-${i+1}`))
        }else{
            drawFile(obj, Id(`problem-input-${i-2}`), Id(`problem-output-${i-2}`))
        }
    }
    if (SET.solutions == undefined){
        return
    }

    for (let i=0; i<SET.solutions.length; i++){
        let prob = SET.solutions[i]
        Id(`numsol-${i+1}`).innerHTML = prob.length
        for (let j=0;j<prob.length; j++){
            Class('space')[i].innerHTML = Class('space')[i].innerHTML + `<canvas id = 'sol-${i+1}-${j+1}' class = 'canvas solution sol-${i+1}'></canvas>`
            let canvas = Id(`sol-${i+1}-${j+1}`)
            canvas.width = S
            canvas.height = S
        }
    }

    for (let i=0; i<SET.solutions.length; i++){
        let file = Objects[i+3]
        let prob = SET.solutions[i]
        for (let j=0; j<prob.length; j++){
            let sol = prob[j]
            let canvas = Id(`sol-${i+1}-${j+1}`)
            let ctx = canvas.getContext('2d')
            drawInput(file, canvas)
            drawSolution(file, sol, ctx)
        }
    }
    Id('loading').style.display = 'None'
}