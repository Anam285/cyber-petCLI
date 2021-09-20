const inquirer = require('inquirer');

class Pet {
    constructor (name,age){
        this.Name=name;
        this.Age=age;
        this.hunger=50;
        this.bored=50;
        this.energy=50;
        this.sleepy=50;
        this.liskes=50;


    }
    get nameAge(){
        return `your pet is ${this.Name} and ${this.Age}`;
    }

    health(){
        if (this.Age <= 5){
            return 100;
        }else if (this.Age > 5 && this.Age <=10){
            return  50;
        }else {
            return 10;
        }
    }


    feed(){
        return[this.hunger -=3,
        this.energy +=3,
        this.sleepy +=2,
        this.bored +=30,
        this.liskes+=1,]
        
    }
    sit(){
        return[this.hunger +=1,
            this.energy +=1,
            this.sleepy -=2,
            this.bored +=45,
            this.liskes-=1] 
    }

    walk(){
        return[this.hunger +=1,
            this.energy -=2,
            this.sleepy +=1,
            this.bored -=15,
            this.liskes+=1] 
    }

    leap(){        
        return[this.hunger +=2,
        this.energy -=2,
        this.sleepy -=1,
        this.bored -=20,
        this.liskes +=1]

    }


}
class Dog extends Pet{
    constructor(name, age) {
        super(name, age)
    }
    breed(){
        const rand= Math.floor(Math.random() * 4 )+1;
        let breeds=['Labrador', 'Golden Retriever', 'German Shepherd', 'Siberian Husky']
        return `We have a ${this.Age} year old ${breeds[rand]} at our shelter`

    }
}

class Rabbit extends Pet{
    constructor(name, age) {
        super(name, age)
        
    }
    breed(){
        const rand= Math.floor(Math.random() * 4 )+1;
        let breeds=['Holland Lop', 'Mini Lop', 'Rex Rabbit', 'Dutch Rabbit']
        return `We have a ${this.Age} year old ${breeds[rand]} at our shelter`

    }
}


class Cat extends Pet{
    constructor(name, age) {
        super(name, age)   
     }

    breed(){
        const rand= Math.floor(Math.random() * 4 )+1;
        let breeds=['Persia', 'Manine Coon', 'Ragdoll', 'British Shorthair']
        return `We have a ${this.Age} year old ${breeds[rand]} at our shelter`

    }
}

console.log("Welcome to Pet Rescue ")

let stats=[]
function funclog(stats){
    let statBars= ['hungerBar','energyBar', 'sleepBar','boreBar','likeBar']
    for (let i=0; i<stats.length; i++){
        console.log(`${statBars[i]} : ${stats[i]}`);

    }

}


let newPet =' ';

inquirer.prompt(
[
    {
        type: 'input',
        name: 'adopt',
        message : " Would you like to adopt a pet ?",
        validate (value){  
            if (value == 'y' || value == 'yes'){
                return true;}
          
            }

    },

    {
        type: 'list',
        name :'petType',
        message:'What would you like to adopt?',
        choices:['cat', 'Dog', 'Rabbit'],
        

    },
    {
    type: 'input',
    name: 'name',
    message : "Would you like to Name you Pet ?",
    },
    {
    type: 'input',
    name: 'age',
    message : " What age pet are you looking to adopt?",
    }

]).then((answers)=>{
    if (answers.petType === 'cat'){
        newPet = new Cat (answers.name, answers.age);
        console.log( "let us Look for you.... ");
        console.log(newPet.breed())
   


    }else if (answers.petType === 'Dog'){
        newPet = new Dog (answers.name, answers.age)
        console.log( "let us Look for you.... ");
        console.log(newPet.breed())}


    else if (answers.petType === 'Rabbit'){ 
        newPet = new Rabbit (answers.name, answers.age)
        console.log( "let us Look for you.... ");
        console.log(newPet.breed())}

})
.then(() =>{
    console.log("you have to prove yourself to take the pet home");
    game(newPet);
})
.catch((err) => { console.log(err) })

function game(){
    
  inquirer
  .prompt([
    {
      name: "activity",
      type: "list",
      message: "What do you want to do?",
      choices: [
          {
              name:  `Take ${newPet.Name} for Walk`,
              value: 'walk',
          },
          {
            name:  `Feed ${newPet.Name} Some snack`,
            value: 'feed',             
          },
          {
            name:  `Ask ${newPet.Name} to sit down`,
            value: 'sit',
          },
          {
            name:  `play fetch with ${newPet.Name}`,
            value: 'leap',
          }

      ]}
    ])
    .then((answer) =>{
        
        if (answer.activity == 'walk'){
            stats= newPet.walk()
            funclog(stats)
        }
        else if (answer.activity == 'sit'){
            stats = newPet.sit()
            funclog(stats)}


        else if (answer.activity == 'leap'){
            stats = newPet.leap()
            funclog(stats)}

        else if (answer.activity == 'feed'){
            stats = newPet.feed()
            funclog(stats)}
        
            
  
    })
    .then(()=>{ 
        if (stats[3]>=100){
            console.log(`${newPet.Name} Didn't enjoy your company. Try again another time!`)
        
        }else if (stats[3]<=10){
            console.log(`${newPet.Name} Seems to like you and wants to go home with you.`)
            
        }else{
        game()}
    })
   
    .catch((err) => { console.log(err) })
}

     