var name = 'Nensi';
let age = 22;
let hobbies = true;

name = 'Rinkal'

function summarizeUser(userName, userAge, userHobby){
    return ( 
        'Name is ' + userName + ', age is '  + userAge + ', and the user hobbies:' + userHobby 
    )
}

console.log(summarizeUser(name,age,hobbies));