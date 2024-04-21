var counter = document.querySelector('#counter'); 
var round = document.querySelector('#round'); 
var availableIndexes = Array.from({length: fotky.length}, (_, i) => i); // Vytvori pole indexov 0, 1, ..., fotky.length - 1
var countNum = 0;
var note = document.querySelector("h3")
var countText = 'Skóre : '
var lastText = '/25'
var countOfRound = 1;
round.textContent = countOfRound + " Kolo";
// Funkcia na náhodný výber jedného prvku z pola
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function resetGame(){
    var galleryDiv = document.getElementById("gallery");
    var odpovedeDiv = document.getElementById("odpovede");

    round.style.display = "block"

    galleryDiv.innerHTML = "";
    odpovedeDiv.innerHTML = "";
    if (availableIndexes.length === 0) {
        // Ak sme vyčerpali všetky vlajky, zobrazíme alert s výhodnotením
        alert("Hra skončila! Tvoje skóre: " + countNum + "/25");
        document.getElementById("play-again").style.display = "block";
        round.style.display = "none"
        availableIndexes = Array.from({length: fotky.length}, (_, i) => i); // Zresetujeme dostupné indexy
        counter.textContent = countNum; // Aktualizujeme zobrazenie skóre
        countNum = 0; // Resetujeme skóre
        countOfRound = 1
        round.textContent = countOfRound + " Kolo";
        return;
    }
    if (availableIndexes.length === 25){
        countNum = 0                
        counter.textContent = countText+ countNum + lastText
        countOfRound = 1
        round.textContent = countOfRound + " Kolo";
    }
    
    var randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]; // Vyberieme náhodný index z dostupných
    var selectedFoto = fotky[randomIndex];
    var selectedName = selectedFoto.split(".png")[0];

    var img = document.createElement("img");
    img.src = selectedFoto;
    img.alt = selectedFoto;
    galleryDiv.appendChild(img);

    availableIndexes = availableIndexes.filter(index => index !== randomIndex); // Odstranime pouzity index

    var shuffledNames = names.slice(); 
    shuffledNames = shuffledNames.filter(function(item) {
        return item !== selectedName;
    });

    shuffledNames.sort(() => Math.random() - 0.5);

    var randomNames = [];
    while (randomNames.length < 3) {
        var randomName = getRandomItem(shuffledNames);
        randomNames.push(randomName);
        shuffledNames = shuffledNames.filter(function(item) {
            return item !== randomName;
        });
    }

    randomNames.push(selectedName);

    randomNames.sort(() => Math.random() - 0.5);

    randomNames.forEach(function(name) {
        var p = document.createElement("p");
        p.textContent = name;
        p.addEventListener("click", handleClick);
        odpovedeDiv.appendChild(p);
    });
}

function handleClick(event) {
    var name = event.target.textContent;
    var selectedName = document.querySelector("#gallery img").alt.split(".")[0];
    if (name === selectedName) {
        event.target.classList.add("correct");
        countNum++;
       
        counter.textContent = countText + countNum + lastText;
    } else {
        event.target.classList.add("incorrect");
    }
    var odpovede = document.querySelectorAll("p");
    odpovede.forEach(function(p) {
        p.removeEventListener("click", handleClick);
    });
    document.getElementById("next-round").style.display = "block";
    note.classList.add("padding");
}

document.getElementById("next-round").addEventListener("click", function() {

    document.getElementById("next-round").style.display = "none";
    note.classList.remove("padding");
    countOfRound++;
    round.textContent = countOfRound + " Kolo";
    
    resetGame();
});
document.getElementById("play-again").addEventListener("click", function() {
    document.getElementById("play-again").style.display = "none";
    resetGame();
});

resetGame();