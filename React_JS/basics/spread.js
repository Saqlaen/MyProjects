let ar = [ 1, 2, 3, 4]

let ar2 = ar;
ar2.push('haaa');
console.log( ar )
console.log( ar2 )

let newcopy = [ 1, 2, 3, 4, 5 ];
let copy = [ ...newcopy ]
copy.push( 22 )

console.log( newcopy )
console.log( copy )


let obj = { 
    name : 'arjun',
    age : 24,
    address : {
        street : 24,
        city : 'india',
        state : 'banghim'
    }
}

let copyobj = { ...obj };
copyobj.address.street = 55;

let copyobj2 = { ...obj, address:{...obj.address } }
copyobj2.address.street = 8080;

console.log( obj )
console.log( copyobj )
console.log( copyobj2 )