const letters = "トウキョとうきょわたしンギ莨たばこタバコ XYZ0123456789".split(''),
    windowSize = {},
    container = document.querySelector('.container'),
    lettersQty = letters.length,
    animationSpeed = 5000    

let intervalDelay = 1,
    intervalId = null,
    iteration = 0,
    maxIter = 2000,
    nbCol = 0,
    colId = []

window.addEventListener("resize", launchLoader)

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

function launchLoader() {
    
    getSize().then(() => {

        clearInterval(intervalId)

        nbCol = Math.floor(windowSize.width / 16)
        maxIter = nbCol * 20
        intervalDelay = 20 / nbCol    

        intervalId = setInterval(fillThePage, intervalDelay)
    })
}

async function getSize() {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight

    return windowSize
}

function getColPos(){
    colId.length === 0 && (colId = Array(nbCol).fill().map((_,idx) => idx))
    let valueIdx = getRandomInt(colId.length)
    let colPos = colId[valueIdx]
    colId.splice(valueIdx, 1)

    return colPos
}

function fillThePage() {
    iteration++
    iteration === maxIter && pageIsLoaded()

    // console.log(colId.length)

    const newColumn = document.createElement('div')
    newColumn.className = 'txt-col'

    const colPos = getColPos()

    // console.log('colpos', colPos)

    newColumn.style.setProperty('--col-pos', colPos + 'rem')

    let sentence = Array(getRandomInt(25) + 25).fill(0)

    sentence.forEach(letter => {
        letter = letters[getRandomInt(lettersQty)]

        const newLetter = document.createElement('span')

        newLetter.innerText = letter
        newColumn.appendChild(newLetter)
    })

    container.appendChild(newColumn)

    setTimeout(() => { newColumn.remove() }, animationSpeed)
}

function pageIsLoaded() {
    clearInterval(intervalId)
}

launchLoader()