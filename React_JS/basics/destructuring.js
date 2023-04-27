let arr = [ 1, 2, 3, 4, 5]
// let a = arr[0]

let [a,,,,] = arr;
// console.log( a )


let obj = {
    name : 'hunk',
    age : 22,
    address : {
        comment : 'ohh noooo',
        alive : false
    }
}

let { name:aliasName, age , address , extra ='default' } = {...obj};
console.log( aliasName,  address, extra  )

let { address:haay } = {...obj};
console.log( haay )

// destructuring address
let { address:{comment:cmt, alive:statu} } = obj;
console.log( cmt , statu ) 
