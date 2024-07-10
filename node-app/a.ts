const x: number = 1;
console.log(x);

function greet(firstName: string) {
    console.log("Hello " + firstName);
}

greet("harkirat");
//return type to function after arguments include type after a ":" i.e :number,:string
function sum(a: number, b: number): number {
    return a + b;
}

console.log(sum(2, 3));

function isLegal(age: number) {
    if (age > 18) {
        return true;
    } else {
        return false
    }
}

console.log(isLegal(2));

function delayedCall(fn: () => void) {
    setTimeout(fn, 3000);
}

delayedCall(function() {
    console.log("hi there");
})