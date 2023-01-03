const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please check your data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
    rating:7,
    review: "Pretty solid as a fruit."
});

// fruit.save();

const personSchema=new mongoose.Schema({
    name: String,
    age: Number, 
    favouriteFruit: fruitSchema
});

const Person=mongoose.model("Person",personSchema);

const pineapple=new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit."
})

const mango=new Fruit({
    name: "Mango",
    rating: 9.5,
    review: "Nothing so juicy as this!"
})

// mango.save();

// pineapple.save();

Person.updateOne({name:"Soumyadeep"},{favouriteFruit: mango},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Updated successfully the document!");
    }
});


const person=new Person({
    name:"Amy",
    age:12,
    favouriteFruit: pineapple
});

// person.save();

// const kiwi=new Fruit({
//     name: "Kiwi",
//     rating: 10,
//     review:"The best fruit!"
// });

// const orange=new Fruit({
//     name: "Orange",
//     rating: 4,
//     review:"Too sour for me"
// });

// const banana=new Fruit({
//     name: "Banana",
//     rating: 3,
//     review:"Weird texture!"
// });

// Fruit.insertMany([kiwi,orange,banana],(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

Fruit.find((err,fruits)=>{
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();

        fruits.forEach((fruit)=>{
            console.log(fruit.name);
        })
    }
});

// Fruit.updateOne({_id: "63b3193e9f69aa383b88db53"},{name: "Peach",rating:8,review:"Peaches are so yummy!"},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated the document.");
//     }
// });

Fruit.deleteOne({_id: "63b324107579a98fbccff46a"},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted the document!");
    }
});

// Person.deleteMany({name:"Soumyadeep"},(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully deleted all the dcouments!");;
//     }
// });