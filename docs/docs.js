for (let i=0; i<PAGE.length; i++){
    let elem = PAGE[i]
    Id('docs').innerHTML += parseElement(elem, null)
}

function parseElement(element, color){
    let string = ``
    /*
    for (const prop in element){
        if (prop == 'elems'){

        }else{
            string += `<div> ${element[prop]} </div>`
        }

        switch (element.type){

            case 'elems':

                break
            default:
                break
        }
    }
    */

    switch (element.type){
        case 'section':
            string +=
            `
            <div class = 'section elem'>
                <h1 class = 'section-name name'> ${element.name} </h1>
                <p class = 'section-blurb blurb'> ${element.blurb} </p>
                <div class = 'section-elements elements'>
            `
            for (let i=0; i<element.elems.length; i++){
                let elem = element.elems[i]
                string += parseElement(elem, null)
            }
            string += `</div> </div>`
            break
        case 'subsection':
            string +=
            `
            <div class = 'subsection elem'>
                <h1 class = 'subsection-name name'> ${element.name} </h1>
                <p class = 'subsection-blurb blurb'> ${element.blurb} </p>
                <div class = 'subsection-elements elements'>
            `
            for (let i=0; i<element.elems.length; i++){
                let elem = element.elems[i]
                string += parseElement(elem, element.color)
            }
            string += `</div> </div>`
            break
        case 'pair':
            string +=
            `
            <div class = 'pair elem'>
                <div class = 'pair-elements elements'>
            `
            for (let i=0; i<element.elems.length; i++){
                let elem = element.elems[i]
                string += parseElement(elem, color)
            }
            string += `</div> </div>`
            break
        case 'function':
            let params = element.params.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
            string +=
            `
            <div class = 'function elem'>
                <div class = 'function-image'> </div>
                <div class = 'function-body'>
                    <div class = 'function-head'>
                        <div class = 'function-names'>
            `
            let split = params.split(' / ')
            for (let i=0; i<split.length; i++){
                let param = split[i]
                string += `<h1 class = 'function-name name tag-${color}'> ${element.name}<span class = 'parameter'>(${param})</span> </h1>`
            }
            string += `</div>`
            if (element.return){
                let ret = element.return.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
                string +=
                `
                <span class="icon material-icons"> arrow_forward </span>
                <h2 class = 'function-return return'> ${ret} </h2>
                `
            }
            string += `</div> <p class = 'function-blurb blurb'> ${element.blurb} </p> </div> </div>`
            break
        default:
            break
    }

    return string
}


