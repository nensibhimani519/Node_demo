const events = require('events')

const emitter = new events.EventEmitter()

emitter.on('myemit',()=>{
    console.log("This is my emitter event");
})

emitter.on('myemit',(data)=>{
    console.log(`This is my secound emitter event with some ${data}`);
})

emitter.emit('myemit','Javascript Demo')