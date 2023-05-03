const data = [
{name:"Daniel", age: 18 , other:"xxx"},
{name:"Cristina", age: 25, other:"yyy"},
{name:"Paul", age: 12, other:"zzz"},
{name:"Daniela", age:31, other:"ttt"}
];

//imperative.js
const result=[];

for(let i=0; i<data.length; i++){
    if(data[i].age >=21){
        result.push(data[i]);
    }
}

console.log(result);

// declarative.js
const isAdult= (person)=> person.age >=21;
const result2= data.filter(isAdult);

console.log(result2);

// declarative FP 
/**
 * Modular 
 * Understandable
 * Testable
 * Extensible
 * Reusable
 * 
 * KEy features of JS
 * Function as Firts-class objetcs
 * Recursion
 * Closures
 * Arrow Functions
 * Spread
 * 
 */

//Recursion
function fact(n) {
    if(n===0){
        return 1;
    } else{
        return n * fact(n-1);
    }
}
 console.log("Recursion:")
console.log(fact(5));

// Closures 

function newCounter(){
    let count =0;
    return function(){
        count++;
        return count;
    };
}
console.log("Closures:")
const nc= newCounter();
console.log(nc());
console.log(nc());
console.log(nc());


// Arrow Functions are just shorter
const fact2 = (n)=> {
    if(n===0){
        return 1;
    } else{
        return n * fact(n-1);
    }
};

const fact3 = (n)=> (n===0 ? 1:n* fact3(n-1));
console.log(fact3(5));

// Spread ... 
 const sum3=(a,b,c) => a+b+c;
 const x=[1,2,3];
 console.log("Operador spread")
 console.log(sum3(...x));

 const f=[4,5,6];
 const g=[7,...x, ...f, 8];
 console.log("union")
 console.log(g);
 
