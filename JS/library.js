function _dist(a, b) {
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
}

function r(n) {
    return Math.round(n)
}

/*

A 1 2 3
B 1 2 3
C 1 2 3


111
112



*/

/*
let dists = []
let indexes = []

for (let i = 0; i < 3; i++){
    let p0 = A[0].points[i]
    for (let j = 0; j < 3; j++){
        let p1 = A[1].points[j]
        for (let k = 0; k < 3; k++){
            let p2 = A[2].points[k]
            dists.push(_dist(p0, p1) + _dist(p0, p2))
            indexes.push([i,j,k])
        }
    }
}

let min = dists[0]
let ind = indexes[0]

for (let i = 1; i < dists.length; i++){
    let dist = dists[i]
    if (dist < min) {
        ind = indexes[i]
    }
}

let points = [A[0].points[ind[0]], A[1].points[ind[1]], A[2].points[ind[2]]]

Z = [{
    type: "polygon",
    stage: 1,
    rgb: "#FFCE00",
    points: points
}]
*/