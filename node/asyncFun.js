const { log } = require("console");

const fetchData = () =>{

    const promise = new Promise ((resolve, reject ) => {
      
        setTimeout(() => {
            // callback('Done !!!')
                resolve('Done !!!')
        }, 1500);
    })
    return promise
}

setTimeout(() => {
    console.log("Timer is Done !!!!")
    fetchData()
        .then(text => {
            console.log(text,'text');
            return fetchData();
        })
        .then(text2 =>{
            console.log(text2,'text 2');
        })

}, 2000);

console.log('Hello')