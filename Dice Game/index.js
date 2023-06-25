var randomNumber1 = Math.floor((Math.random() * 6) + 1);
var randomNumber2 = Math.floor((Math.random() * 6) + 1);

if (randomNumber1 === 1)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice1.png");
if (randomNumber1 === 2)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice2.png");
if (randomNumber1 === 3)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice3.png");
if (randomNumber1 === 4)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice4.png");
if (randomNumber1 === 5)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice5.png");
if (randomNumber1 === 6)
    document.querySelector(".img1").setAttribute("src", "/Dice Game/images/dice6.png");
if (randomNumber2 === 1)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice1.png");
if (randomNumber2 === 2)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice2.png");
if (randomNumber2 === 3)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice3.png");
if (randomNumber2 === 4)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice4.png");
if (randomNumber2 === 5)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice5.png");
if (randomNumber2 === 6)
    document.querySelector(".img2").setAttribute("src", "/Dice Game/images/dice6.png");

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "Player 1 Wins!";
}
else if(randomNumber2 > randomNumber1) 
{
    document.querySelector("h1").textContent = "Player 2 Wins!";
} 
else{
    document.querySelector("h1").textContent = "Draw!";
}

