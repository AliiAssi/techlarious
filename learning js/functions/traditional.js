function firstFun(){
    console.log();
    console.log("first function created");
    console.log("----------------------------------------------------------------");
}
function secondFun(){
    console.log("second function created");
    console.log("----------------------------------------------------------------");
}
function thirdFun(firtParam,secondParam){
    return firtParam + secondParam;
}
function printSummation(sum){
    console.log("printing summation : "+sum);
    console.log("----------------------------------------------------------------");
}
firstFun();
secondFun();
printSummation(thirdFun(1,1))

