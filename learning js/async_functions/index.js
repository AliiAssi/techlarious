const p = new Promise((resolve, reject) => {
    let pass = "pass pass";
    let confirm = "pass";
    if (pass.toUpperCase().endsWith(confirm.toUpperCase())) {
        setTimeout(()=>{
            resolve("success");
        },3000)
    } else {
        reject("failure");
    }
});

const asyncHandlerFunction = async () => {
    try 
        {
            let msg = await p;
            console.log(msg);
        }
    catch (e)
        {
            console.error(e);
        }
};

asyncHandlerFunction();
