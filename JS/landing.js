localStorage.setItem('svg',0)
sessionStorage.setItem('searchID', 'null')

let Jsons = []
let Problems = []
let index = 0
fetchSVG(1000)
processProblems()

let p =
[
    {
        "type": "circle", "stage": 0, "rgb": "#00FF6E", "center": [850, 170], "radius": 15, "disabled": 0
    },
    {
        "type": "circle", "stage": 0, "rgb": "#00FF6E", "center": [160, 880], "radius": 15, "disabled": 0
    },
    {
        "type": "polyline", "stage": 0, "rgb": "#FFCE00", "points": [[230, 705], [405, 800], [190, 330], [295, 360], [355, 220], [555, 590], [605, 290], [830, 475], [775, 290], [860, 300]], "disabled": 0
    },
    {
        "type": "polygon", "stage": 1, "rgb": "#FF0000", "points": [[160, 880], [405, 800], [295, 360], [555, 590], [830, 475], [860, 300], [850, 170], [775, 290], [605, 290], [355, 220], [190, 330], [230, 705]], "disabled": 0
    }
]

///drawFile(p, Id('input'), Id('output'))

setTimeout(()=>{
    processProblems()

    if (Jsons.length == 0) {
        location.reload()
    }

    for (let i=0; i<Jsons.length; i++){
        let set = Jsons[i]
        for (let j=0; j<set.problems.length; j++){
            let prob = set.problems[j]
            Problems.push(prob)
        }
    }

    // create canvases
    for (let i = 0; i < Class('gallery').length; i++){
        let gallery = Class('gallery')[i]
        let str = ``

        for (let j =0; j < Problems.length; j++){
            str += `<canvas id = 'canvas-${i}-${j}' class = 'canv'> </canvas>`
        }

        gallery.innerHTML = str
    }

    // draw problems
    let i = 0
    while(Problems.length > 0) {
        prob = Problems.pop()
        for (let j = 0; j < Class('gallery').length; j++) {
            drawFile(prob, Id(`canvas-${j}-${i}`), Id('output'))
        }
        i++
    }

    // shuffle HTML
    for (let i = 0; i < Class('gallery').length; i++) {
        let gallery = Class('gallery')[i]

        for (let j = gallery.children.length; j >= 0; j--) {
            gallery.appendChild(gallery.children[Math.random() * j | 0]);
        }
    }

    Id('gallery').classList.add('active')

    setTimeout(() => {
        setInterval(() => {

            for (let i = 0; i < Class('gallery').length; i++) {
                let gallery = Class('gallery')[i]

                gallery.scrollBy(0.5 + i / 2, 0)
                let div = gallery.firstElementChild
                if (div) {
                    let rect = div.getBoundingClientRect()

                    if (rect.right < 0) {
                        gallery.removeChild(div)
                        gallery.appendChild(div)
                        gallery.scrollBy(-120, 0)
                    }
                }
            }

            for (let i = 0; i < Class('canv').length; i++) {
                let canv = Class('canv')[i]

                let rect = canv.getBoundingClientRect()
                let center = rect.left + rect.width / 2
                let scale = Math.abs(window.innerWidth)

                //canv.style.transform = `scale(${scale})`
            }

        }, 10)
    }
    ,100)

},300)




let tries = localStorage.getItem('tries')
if (tries == null || tries < 2) {
    localStorage.setItem('tries', tries+1)
    location.reload()
}
