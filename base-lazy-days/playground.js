
class Dog {

  name = "pepe"

  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof! ${this.name}`;
  }
  
  getName(){
    return this.name
  }
}


const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

Dog.prototype.play = function(){ console.log(`Playing now!${this.name}`)};

dog2.play();