class Parent {
  constructor(name) {
    this.name = name;
  }

  getName() {
    setTimeout(() => {
      console.log("Parent Name =", this.name);
      setTimeout(() => {
        console.log("testing ....");
      }, 1000);
    }, 1000);
    
  }
}

// Example usage
const parentInstance = new Parent("John");
parentInstance.getName();
