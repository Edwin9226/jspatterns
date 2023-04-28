const data = [
{name:"Daniel", age: 18 , other:"xxx"},
{name:"Cristina", age: 25, other:"yyy"},
{name:"Paul", age: 24, other:"zzz"},
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