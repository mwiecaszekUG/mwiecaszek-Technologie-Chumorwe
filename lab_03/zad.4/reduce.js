const arr = [
    { key: 0, x: [4,5,6], y: [1,2,3,4]},
    { key: 0, x: [1], y: [] }
]

const sum = arr.reduce((acc, curr) => {
    acc = acc + curr.x.length + curr.y.length
    return acc
}, 0)

console.log("Suma długości wewnętrznych tablic: "+sum);
