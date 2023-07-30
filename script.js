const app = document.getElementById("app")

const popup = document.getElementById("popup")
const popupBody = document.getElementById("popup-body")

const counter_n = document.getElementById("counter")
let counter_s = document.createElement("span")
counter_n.appendChild(counter_s)

let counter = 0

let transarr = []

for (let i = 1; i < 16; i++) {
    const item = i
    transarr.push(item)
}

transarr.push("")

const newarr = transarr => {
    for (let i = transarr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = transarr[i]
        transarr[i] = transarr[j]
        transarr[j] = temp
    }
    return transarr
}

newarr(transarr)

const cells = []

for (let i = 0; i < 16; i++){
    let cell = document.createElement("div")
    cell.classList.add("cell")

    app.appendChild(cell)

    cells.push(cell.innerText = newarr(transarr[i]))
    
    cell.addEventListener("click", (event) => onClickCell(event, i))
}

let newcell = true
let temp = ""
let checkWinArr = []

function onClickCell(event, index) {
    let i = Math.floor(index / 4)
    let j = index % 4

    if(newcell && index+4 <= 15 &&
        app.children[index+4].innerText == "" &&
        app.children[index].innerText !== "")         
    {         
        temp = app.children[index].innerText
        newcell = false
        app.children[index].innerText = null
        checkWinArr.length = 0
        compare.length = 0
    }
    else if(newcell && index-4 >= 0 &&
        app.children[index-4].innerText == "" &&
        app.children[index].innerText !== "")         
    {         
        temp = app.children[index].innerText
        newcell = false
        app.children[index].innerText = null
        checkWinArr.length = 0
        compare.length = 0
    }
    else if(
            newcell && index+1 <= 15 &&
            app.children[index+1].innerText == "" &&
            app.children[index].innerText !== "" &&
            j !== 3
        ){         
            temp = app.children[index].innerText
            newcell = false
            app.children[index].innerText = null
            checkWinArr.length = 0
            compare.length = 0
    }
    else if(
            newcell &&
            index-1 >= 0 &&
            app.children[index-1].innerText == "" &&
            app.children[index].innerText !== "" &&
            j !== 0
        ){         
            temp = app.children[index].innerText
            newcell = false
            app.children[index].innerText = null
            checkWinArr.length = 0
            compare.length = 0
    }
    else if(
            newcell &&
            (index >= 0 || app.children[index-4].innerText !== "") &&
            (index >= 0 || app.children[index-1].innerText !== "") &&
            (index <= 15 || app.children[index+1].innerText !== "") &&
            (index <= 15 || app.children[index+4].innerText !== "") &&
            app.children[index].innerText !== ""
        ){      
            return
        }
    else if(
            temp == "" &&
        app.children[index].innerText == ""
    ){
        return
    }
    else
    {            
        if (app.children[index].innerText == "")
        {
            app.children[index].innerText = temp
            newcell = true
            temp = ""
            counter++
            for (index = 0; index < 16; index++){
                checkWinArr.push(parseInt(app.children[index].innerText))
                }
            checkWin()
        }    
    }    
    counter_s.innerText = `${counter}`
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, NaN]

let compare = []

function checkWin() {
    for (let i = 0; i < checkWinArr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (checkWinArr[i] === arr[j] && i == j) {
                compare.push(checkWinArr[i])
            }
        }
    }
    if (compare.length == 15) {
        showWinPopup()
    }
}

function showWinPopup(){
    popupBody.innerText = 'Победа!'
    popup.style.display = "flex"
}

const button = document.getElementById('button')
button.addEventListener("click", (event) => onClickButton(event))

function onClickButton(event) {
    popup.style.display = "none"
    location.reload()
}