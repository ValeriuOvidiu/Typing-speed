window.onload = function () {
    requestAnimationFrame(textCursor)
    shuffle()
    addEventListener("keydown", keydownHandler)
    document.getElementById("score").innerHTML = "Wpm :" + score
    document.getElementById("time").innerHTML = "Time left: " + timeLeft + " s"
    document.getElementById("start").innerHTML = "Start typing"
}

let afterTextCursor = 0
let timeLeft = 60
let score = 0
let setTimeInterval = true
let timeIntervalId

function keydownHandler(event) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    if (event.key === shuffledWordsSentence[afterTextCursor]) {
        ++afterTextCursor
    } else if (event.key == "Backspace" && afterTextCursor > 0) {
        --afterTextCursor
        fr[afterTextCursor] = 0

    } else if (event.key != "Backspace") {
        ++fr[afterTextCursor]
        ++afterTextCursor
    }
    if (setTimeInterval) {
        timeIntervalId = setInterval(countTime, 1000)
        setTimeInterval = false
    }
    document.getElementById("start").innerHTML = null
}

function countTime() {
    --timeLeft
    document.getElementById("time").innerHTML = "Time left: " + timeLeft + " s"
    if (timeLeft == 0) {
        gameOver()
    }
}

let cursorAnimation
let textAnimation
let canvasWidth = 1200
let canvasHeight = 150
const textCursorX = 600

function textCursor() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (showCursor == 1) {
        ctx.beginPath()
        ctx.moveTo(textCursorX, 40)
        ctx.lineTo(textCursorX, 110)
        ctx.stroke()
    }
    cursorAnimation = requestAnimationFrame(textCursor)
    textAnimation = requestAnimationFrame(drawText)
}

let rightSide
let leftSide
let checkJustOnce = false

function drawText() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    rightSide = shuffledWordsSentence.substring(afterTextCursor)
    leftSide = shuffledWordsSentence.substring(0, afterTextCursor)
    ctx.fillStyle = "black"
    ctx.textBaseline = "alpabetic"
    ctx.font = "50px serif";
    ctx.textAlign = "left";
    ctx.fillText(rightSide, textCursorX, 90);
    let opositeI = 0
    if (leftSide[afterTextCursor - 1] == " " && fr[afterTextCursor - 1] == 0 && !checkJustOnce) {
        countSore()
    } else if (leftSide[afterTextCursor - 1] != " ") {
        checkJustOnce = false
    }
    ctx.font = "50px serif";
    ctx.textAlign = "right";
    for (let i = afterTextCursor - 1; i >= 0; --i) {
        if (fr[i] == 0) {
            ctx.fillStyle = "green"
            ctx.fillText(leftSide[i], textCursorX - opositeI, 90);
        } else {
            if (leftSide[i] == " ") {
                ctx.fillStyle = "red"
                ctx.fillText("_", textCursorX - opositeI - 5, 90);
                opositeI += 20
            } else {
                ctx.fillStyle = "red"
                ctx.fillText(leftSide[i], textCursorX - opositeI, 90);
            }
        }
        const width = ctx.measureText(leftSide[i]).width;
        opositeI += width
    }
}

function countSore() {
    let findMistackes = 0
    score = 0
    for (let i = afterTextCursor - 1; i >= 0; --i) {
        if (leftSide[i] == " " && fr[i] == 0) {
            findMistackes = 0
            while (leftSide[i - 1] != " " && i - 1 >= 0) {
                if (fr[i - 1] != 0) {
                    ++findMistackes
                }
                --i
            }
            if (findMistackes == 0) {
                ++score
            }
        }
    }
    document.getElementById("score").innerHTML = "Wpm :" + score
    checkJustOnce = true
}

let showCursor = 1
setInterval(changeCursorValue, 300)

function changeCursorValue() {
    showCursor = -showCursor
}

let wordsArray = ["airplane", "brother", "coffee", "diamond", "elephant", "family", "garden", "hamster", "island", "jungle", "kitten",
    "lemon", "monkey", "notebook", "ostrich", "pepper", "quality", "rabbit", "sunflower", "tulip", "unicorn", "violin", "watermelon",
    "xylophone", "yogurt", "zebra", "apartment", "balloon", "chocolate", "dolphin", "electricity", "firework", "grandmother", "hurricane",
    "important", "jacket", "knowledge", "laptop", "mountain", "neighborhood", "orange", "pizza", "quiet", "rainbow", "subway", "telephone",
    "umbrella", "vegetable", "waterfall", "xylophone", "yacht", "zeppelin", "antelope", "butterfly", "caterpillar", "dandelion",
    "elephant", "flamingo", "gorilla", "hedgehog", "iguana", "jellyfish", "koala", "llama", "mosquito", "nightingale", "octopus",
    "penguin", "quail", "raccoon", "starfish", "turtle", "unicorn", "vulture", "walrus", "xylophone", "yak", "zebra", "astronaut",
    "bookshelf", "calendar", "dragonfly", "electrician", "firefighter", "geography", "haircut", "information", "jewelry", "kangaroo",
    "library", "mushroom", "nutrition", "ocean", "photography", "questionnaire", "recycling", "sunshine", "television", "university",
    "vegetarian", "window", "xylophone", "youth", "zealot", "ambulance", "backpack", "camera", "dictionary", "elephant",
    "flashlight", "guitar", "hospital", "internet", "jacket", "kitchen", "lightning", "microwave", "needle", "orchestra", "pillow",
    "quotation", "raincoat", "snowman", "toilet", "umbrella", "vacation", "wheelchair", "xylophone", "yoga", "zucchini", "alphabet",
    "birthday", "candle", "doctor", "eggplant", "fireplace", "giraffe", "hamburger", "invisible", "journal", "kangaroo", "leopard",
    "microphone", "notebook", "oceanography", "piano", "quarantine", "rainforest", "seashell", "telephone", "umbrella",
    "valentine", "waterfall", "xylophone", "yesterday", "zealot", "astronomy", "backpack", "calendar", "dinosaur", "elephant",
    "football", "gardenia", "hairbrush", "information", "jigsaw", "kiwi", "limousine", "motorcycle", "notebook", "ocean",
    "penguin", "quilting", "railroad", "spaghetti", "telephone", "umbrella", "volcano", "watermelon", "xylophone", "yacht",
    "zookeeper", "consensus", "consequence", "conservative", "consider", "considerable", "consideration", "consist", "consistent", "constant",
    "constantly", "constitute", "constitutional", "construct", "construction", "consultant",
    , "labor", "laboratory", "lack", "lady", "lake", "land", "landscape", "language", "lap", "large", "largely", "last", "late", "later", "latin", "latter", "laugh"
    , "launch"]

let shuffledWordsSentence
let fr = []

function shuffle() {
    let currentIndex = wordsArray.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [wordsArray[currentIndex], wordsArray[randomIndex]] = [wordsArray[randomIndex], wordsArray[currentIndex]];
    }
    let wordsArrayLength = wordsArray.length
    for (let i = 0; i < wordsArrayLength; ++i) {
        if (i == 0) {
            shuffledWordsSentence = wordsArray[i];
        } else {
            shuffledWordsSentence += (" " + wordsArray[i])
        }
    }
    let shuffledWordsSentenceLength = shuffledWordsSentence.length;
    for (let i = 0; i <= shuffledWordsSentenceLength; ++i) {
        fr[i] = 0
    }
}

function gameOver() {
    removeEventListener("keydown", keydownHandler)
    clearInterval(timeIntervalId)
    const div = document.getElementById("gameOver")
    const gameOverCanvas = document.createElement("CANVAS");
    gameOverCanvas.width = 800
    gameOverCanvas.height = 400
    const secondCtx = gameOverCanvas.getContext("2d")
    secondCtx.fillStyle = "green"
    secondCtx.fillRect(300, 250, 200, 100)
    secondCtx.fillStyle = "red"
    secondCtx.textBaseline = "alpabetic"
    secondCtx.textAlign = "left"
    secondCtx.font = "50px serif"
    secondCtx.fillText("Restart", 330, 320)
    let concluzion = "You are a turtle"
    if (score > 100) {
        concluzion = "You are very fast"
    } else if (score > 50) {
        concluzion = "You did great"
    } else if (score > 25) {
        concluzion = "It could be better"
    }
    secondCtx.fillText("Wpm: " + score, 300, 90)
    secondCtx.fillText(concluzion, 230, 150)
    gameOverCanvas.addEventListener("click", restart)
    div.appendChild(gameOverCanvas)
}

function restart(event) {
    if (event.offsetX > 300 && event.offsetX < 500 && event.offsetY > 250 && event.offsetY < 350) {
        document.getElementById("gameOver").innerHTML = null
        shuffle()
        addEventListener("keydown", keydownHandler)
        score = 0
        afterTextCursor = 0
        timeLeft = 60
        score = 0
        setTimeInterval = true
        addEventListener("keydown", keydownHandler)
        document.getElementById("score").innerHTML = "Wpm :" + score
        document.getElementById("time").innerHTML = "Time left: " + timeLeft + " s"
        document.getElementById("start").innerHTML = "Start typing"
    }
}


