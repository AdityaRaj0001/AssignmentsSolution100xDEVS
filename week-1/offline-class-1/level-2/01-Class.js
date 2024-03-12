
class Animal {
  constructor(name, legCount) {
    this.name = name
    this.legCount = legCount
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`
  }
}


const animal1=new Animal
animal1.name="Bear"
animal1.legCount=4

console.log(animal1.describe())

// // Create an instance of the Animal class
// const myAnimal = new Animal("Lion", 4);

// // Call the describe method and log the result
// console.log(myAnimal.describe());


