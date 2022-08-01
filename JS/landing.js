localStorage.setItem('svg',0)
sessionStorage.setItem('searchID', 'null')

let Jsons = []
let Problems = []
let index = 0
fetchSVG(1000)
processProblems()

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
    for (let i = 0; i < Class('row').length; i++){
        let gallery = Class('row')[i]
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
        for (let j = 0; j < Class('row').length; j++) {
            drawFile(prob, Id(`canvas-${j}-${i}`), Id('output'))
        }
        i++
    }

    // shuffle HTML
    for (let i = 0; i < Class('row').length; i++) {
        let gallery = Class('row')[i]

        for (let j = gallery.children.length; j >= 0; j--) {
            gallery.appendChild(gallery.children[Math.random() * j | 0]);
        }
    }

    Id('gallery').classList.add('active')

    setTimeout(() => {
        setInterval(() => {

            for (let i = 0; i < Class('row').length; i++) {
                let g = Class('row')[i]
                let g_rect = g.getBoundingClientRect()


                g.scrollBy(3, 0)
                let canv = g.firstElementChild
                if (canv) {
                    let rect = canv.getBoundingClientRect()


                    console.log(rect.right + g_rect.left)

                    if (rect.right + g_rect.left < -320) {


                        //let width = JSON.parse(canv.style.width.substring(0, canv.style.width.length - 2))
                        g.removeChild(canv)
                        g.appendChild(canv)
                        g.scrollBy(-140, 0)

                    }
                }
            }

            for (let i = 0; i < Class('canv').length; i++) {
                let canv = Class('canv')[i]
                let g= canv.parentElement
                let rect = canv.getBoundingClientRect()
                let g_rect = g.getBoundingClientRect()
                let width = rect.right - rect.left

                let left = rect.left - g_rect.left
                let right = rect.right - g_rect.left

                let x = left + width / 2
                let w = g_rect.right-g_rect.left+60
                let c = w / 2
                let scale = 1 - Math.abs((w / 2 - x) / (w / 2))

                scale = 1 * ((x - c) / w) ** 2 + 0.75

                scale = 1 * ((x - c) / (w*0.7)) ** 2 + (24/49)

                //scale = Math.sqrt(1 - (((x - c) / c)) ** 2))

                /*
                if (margin == '') {
                    canv.style.marginRight = 0 + 'px'
                } else {
                    let val = JSON.parse(margin.substring(0,margin.length - 2))
                    canv.style.marginRight = (val + 10) + 'px'

                   console.log(val, (val + 1) + 'px')
                }
                */

                if (right > -60 && left - 300 < w) {

                    let ver = 'center'
                    let hor = 'center'
                    let dir = 1

                    if (g.classList.contains('top')) {
                        ver = 'bottom'

                    } else if (g.classList.contains('bottom')) {
                        ver = 'top'
                    }

                    hor = (100 - round(rect.left / window.innerWidth * 100)) + '%'

                    if (x > c) {

                    } else {
                      // hor = -(100-round(rect.left/window.innerWidth*100)) + '%'
                    }

                    canv.style.transform = `scale(${scale}) rotate3d(0,0,0, ${dir*(90-90*scale)}deg)`
                    canv.style.transformOrigin = hor + ' ' + ver

                } else {
                    canv.style.transform = `scale(1)`
                }

                //
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
