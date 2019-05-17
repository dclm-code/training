function helloworld() {
    alert("Hello, world");
    console.log("Hello, world!");
}

function addTwoNumber(a, b) {
    c = a + b;
    d = Math.log10(a);
    console.log(c, d);
}

abayomi = (f, g) => {
    h = f * g
    console.log(h)
}

greetings = () => {
    var name = prompt("Enter your name: ")
    var gender = prompt("Enter your gender: ", "male/female")
    var lk = doSomething()
    var salutation = ""
    if (gender.toLowerCase() === "male") {
        salutation = "Mr. "
    } else {
        salutation = "Mrs/Miss. "
    }
    console.log("Welcome! ", salutation, name)
}

doSomething = () => {
    a = 10 * 10
    return a
}
/*
for(let i=1; i<=100; i++){
    let count = 0
    for(let j=1; j<=i; j++){
        var r = i%j
        if( r === 0)
        {
            count = count + 1
        }
    }
}
r = n%d
r = 7%2
if (r > 0)
*/
odd_numbers = () => {
    let sum_odd = 0
    for(let i=1; i<=100; i++){
        r = i%2
        if(r > 0){
            console.log(i)
            sum_odd += i
        }
    }
    console.log('sum of odds: ', sum_odd)
}
console.log("Odd Number: ")
odd_numbers()

even_numbers = () => {
    let sum_even = 0
    for(let i=1; i<=100; i++){
        r = i%2
        if(r == 0){
            console.log(i)
            sum_even += i
        }
    }
    console.log('sum of evens: ',sum_even)
}
console.log("Even Numbers: ")
even_numbers()

prime_numbers = () => {
    for(let i=1; i<=100; i++){
        let count = 0
        for(let j=1; j<=i; j++){
            let r = i%j
            if(r===0){
                count += 1
            }
        }
        if(count === 2){
            console.log(i)
        }
    }
}
console.log("Prime numbers: ")
prime_numbers()
console.log(typeof(["apple", "banana", "orange"]))
console.log(typeof({}))
console.log(typeof(parseInt(1)))
console.log(typeof("string"))
console.log(typeof(parseFloat(1.05)))
//primitive