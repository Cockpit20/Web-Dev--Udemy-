var eggs=[1,2,3,4,5];
var myEgg=eggs[1];
console.log(myEgg);
console.log(eggs.length);

var guestList=["Rit","Sapta","Shameik","Ridhhi","SPal"]
console.log(guestList);
console.log(typeof(guestList));
var guestName=prompt("What is your name? ");
var c=0;
for (let index = 0; index < guestList.length; index++) {
    if(guestName===guestList[index]){
        alert("Welcome to the party!")
        c++;
    }
}
if(c==0)
{
    alert("Sorry, Maybe next time!");
}

if(guestList.includes(guestName))
    alert("Welcome to the party!");
else
    alert("Sorry, Maybe next time!");
    
    

