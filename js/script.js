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