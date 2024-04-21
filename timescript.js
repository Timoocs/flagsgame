var counter = document.querySelector('#counter'); 
var round = document.querySelector('#round'); 
var availableIndexes = Array.from({length: fotky.length}, (_, i) => i);
var countNum = 0;
var article = document.querySelector("article")
var countText = 'Skóre : '
var lastText = '/25'
var countOfRound = 1;
var roundTimer; // Časovač pre každé kolo
var remainingTime; // Premenná pre zobrazenie zostávajúceho času
var timerElement = document.querySelector('.timer');
round.textContent = countOfRound + " Kolo";

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function resetGame(){
    clearInterval(remainingTime); // Zrušíme predchádzajúci časovač na začiatku každého kola
    clearTimeout(roundTimer); // Resetujeme časovač na začiatku každého kola
    var galleryDiv = document.getElementById("gallery");
    var odpovedeDiv = document.getElementById("odpovede");


    timerElement.style.display = "block";
    timerElement.textContent = "Zostáva: " + 5 + "s";
    timerElement.style.color = "green"
    round.style.display = "block"

    galleryDiv.innerHTML = "";
    odpovedeDiv.innerHTML = "";
    if (availableIndexes.length === 0) {
        alert("Hra skončila! Tvoje skóre: " + countNum + "/25");
        document.getElementById("play-again").style.display = "block";
        timerElement.style.display = "none";
        round.style.display = "none"
        availableIndexes = Array.from({length: fotky.length}, (_, i) => i);
        counter.textContent = countNum;
        countNum = 0;
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
    
    var randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    var selectedFoto = fotky[randomIndex];
    var selectedName = selectedFoto.split(".png")[0];

    var img = document.createElement("img");
    img.src = selectedFoto;
    img.alt = selectedFoto;
    galleryDiv.appendChild(img);

    availableIndexes = availableIndexes.filter(index => index !== randomIndex);

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

    // Nastavenie časovača pre každé kolo na 5 sekúnd
    roundTimer = setTimeout(function() {
        timerElement.textContent = "Čas vypršal";
        document.getElementById("next-round").click(); // Simulácia kliknutia na tlačidlo pre ďalšie kolo
    }, 5000);

    // Nastavenie intervalu na aktualizáciu zostávajúceho času každú sekundu
    var startTime = Date.now();
    remainingTime = setInterval(function() {
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        var timeLeft = 5 - elapsed;
        if (timeLeft >= 0) {
            timerElement.textContent = "Zostáva: " + timeLeft + "s";
        } 
        else {
            timerElement.textContent = "Čas vypršal"; // Nastavíme text na "Čas vypršal" po uplynutí času
            clearInterval(remainingTime); // Zastavíme interval po vypísaní správy
        }
        if(timeLeft > 4){  
                timerElement.style.color = "green"
        }
        if(timeLeft >= 3 ){
            timerElement.style.color = "orange"
        }
        if(timeLeft >= 1 && timeLeft < 3){
            timerElement.style.color = "red"
        }
    }, 1000);
}

function handleClick(event) {
    clearTimeout(roundTimer); // Resetujeme časovač po kliknutí na odpoveď
    clearInterval(remainingTime); // Zrušíme časovač po kliknutí na odpoveď
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
    article.classList.add("padding");
}

document.getElementById("next-round").addEventListener("click", function() {
    clearTimeout(roundTimer); // Resetujeme časovač po kliknutí na ďalšie kolo
    clearInterval(remainingTime); // Zrušíme časovač po kliknutí na ďalšie kolo
    document.getElementById("next-round").style.display = "none";
    article.classList.remove("padding");
    countOfRound++;
    round.textContent = countOfRound + " Kolo";
    resetGame();
});

document.getElementById("play-again").addEventListener("click", function() {
    clearTimeout(roundTimer); // Resetujeme časovač pri reštartovaní hry
    clearInterval(remainingTime); // Zrušíme časovač pri reštartovaní hry
    document.getElementById("play-again").style.display = "none";
    resetGame();
});

resetGame();

