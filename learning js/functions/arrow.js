const printSummationUsingArrowFunction = (a,b)=>{
    console.log("sum = ", a + b);
}


printSummationUsingArrowFunction(1,1);


const noActionArrowFunction = ()=>{
    console.log("noActionArrowFunction defined  start");
      // Define and call the inner arrow function
    (() => {
        console.log("noActionArrowFunction called");
    })();
    console.log("noActionArrowFunction defined end");
}

noActionArrowFunction();

let test = param => console.log("param = ", param);
test(1)
