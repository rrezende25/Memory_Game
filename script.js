"use strict";
let easy_Btn = document.getElementById('easy')
let normal_Btn = document.getElementById('normal')
let hard_Btn = document.getElementById('hard')
let restartBtn = document.querySelectorAll('.restart')
let newgameBtn = document.querySelectorAll('.newgame')
let cardsdataembaralhados
let techs = []
let lockmode = true
let firstcard = [,]
let controle = 0

easy_Btn.addEventListener('click', iniciar)
normal_Btn.addEventListener('click', iniciar)
hard_Btn.addEventListener('click', iniciar)

function iniciar() {
    mudandoatela()
    let id = this.id
    if (id == 'easy') {
        techs = ['bootstrap', 'css', 'firebase', 'electron', 'html', 'javascript']
        let cards = createcardsdata(techs)
        cardsdataembaralhados = shuffle(cards)
        insertcards(cardsdataembaralhados)
        add_flip()
        startfacil()
    } else if (id == 'normal') {
        techs = ['bootstrap', 'css', 'firebase', 'electron', 'html', 'javascript', 'jquery', 'mongo']
        let cards = createcardsdata(techs)
        cardsdataembaralhados = shuffle(cards)
        insertcards(cardsdataembaralhados)
        add_flip()
        startmedio()
    } else {
        techs = ['bootstrap', 'css', 'firebase', 'electron', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react']
        let cards = createcardsdata(techs)
        cardsdataembaralhados = shuffle(cards)
        insertcards(cardsdataembaralhados)
        add_flip()
        startdificil()
    }
}

function mudandoatela() {
    let initial_menu = document.getElementById('menu')
    let initial_title = document.querySelectorAll('.Game_title')
    let initial_desc = document.querySelectorAll('.Game_desc')
    let head = document.getElementById('head')
    initial_menu.style = 'display:none;'
    initial_title[0].style = 'display:none;'
    initial_desc[0].style = 'display:none;'
    head.style = 'display:block;'
}

function createcardsdata(techs) {
    let card = []
    let id = 0
    for (let tech of techs) {
        card.push(createpair(tech, id))
        id++
    }
    return card
}

function createpair(tech, id) {
    return [{
        id: id,
        icon: tech,
        flipped: true

    }, {
        id: id + 100,
        icon: tech,
        flipped: true

    }]
}
function shuffle(cards) {
    let cardeshufle = [...cards]
    for (let j = 0; j < 2; j++) {
        for (let i = cardeshufle.length -1; i > 0; i--) {
            let k = Math.floor(Math.random() * (i + 1))
            let temp = cardeshufle[i][j]
            cardeshufle[i][j] = cardeshufle[k][j]
            cardeshufle[k][j] = temp
        }
    }
    return cardeshufle
}


function insertcards(cards) {
    let board = document.getElementById('board')
    for (let i = 0; i < cards.length; i++) {
        for (let card of cards[i]) {
            board.innerHTML += divcard(card)
        }
    }
}
function divcard(card) {
    return '<div class="card" id="' + card.id + '">' +
        '<div class="front-face">' +
        '<img src="./assets/images/' + card.icon + '.png">' +
        '</div>' +
        '<div class="back-face">' +
        '&lt/&gt' +
        '</div>' +
        '</div>'
}
function add_flip() {
    let cards_inhtml = document.querySelectorAll('.card')
    cards_inhtml.forEach((element) => {
        element.onclick = () => {
            let status = choose_relative_object(element)
            if (lockmode && status.flipped) {
                element.style = 'transition: 0.5s ; transform: rotateY(180deg)'
                checkmatch(element)
                checkgameover()
            }
        }
    })
}
function change_relative_object(div) {
    if (controle % 2 == 0) {
        firstcard[1] = choose_relative_object(div)
        firstcard[1].flipped = false
    } else {
        let secondcard = choose_relative_object(div)
        secondcard.flipped = false
    }
}
function choose_relative_object(div) {
    for (let i = 0; i < cardsdataembaralhados.length ; i++) {
        for (let j = 0; j < 2; j++) {
            if (cardsdataembaralhados[i][j].id == div.id) {
                return cardsdataembaralhados[i][j]
            }
        }
    }
}
function checkmatch(element) {
    if (controle % 2 == 0) {
        firstcard[0] = element
        change_relative_object(element)
        controle++
        return
    } else if ( Math.abs(element.id-firstcard[0].id) != 100) {
        lockmode = false
        setTimeout(() => {
            firstcard[0].style.transform = 'rotatey(0deg)'
            element.style.transform = 'rotatey(0deg)'
            lockmode = true
            firstcard[1].flipped = true
        }, 600)
        controle++
        return
    } else { controle++ }
    change_relative_object(element)
}
function checkgameover(){
    let flippedcards =[]
    for(let i = 0;i<cardsdataembaralhados.length ;i++){
        for(let j = 0;j<2;j++)
        if(cardsdataembaralhados[i][j].flipped){
            flippedcards.push(cardsdataembaralhados[i][j])
        }
    }
    if(flippedcards.length==0){
        let menufinal = document.getElementById('menu_final')
        menufinal.style.display='flex'
    }
}
function startfacil() {
    let board = document.getElementById('board')
    board.style.display = 'grid'
    board.style.gridTemplate = '1fr 1fr 1fr 1fr / 1fr 1fr 1fr'
    board.style.gap = '1.5vmin'
}
function startmedio() {
    let board = document.getElementById('board')
    board.style.display = 'grid'
    board.style.gridTemplate = '1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr'
    board.style.gap = '1.5vmin'
}
function startdificil() {
    let board = document.getElementById('board')
    board.style.display = 'grid'
    board.style.gridTemplate = '1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr'
    board.style.gap = '1.5vmin'
}

restartBtn.forEach(button =>button.addEventListener('click',restart))
newgameBtn.forEach(button =>button.addEventListener('click', newgame))

function restart(){
limpar_tabuleiro()
removerestatuscard()
insertcards(cardsdataembaralhados)
add_flip()
removemenufinal()
controle=0
}
function limpar_tabuleiro(){
    let board = document.getElementById('board')
    while(board.children.length != 0){
    board.removeChild(board.firstChild)
    }
}
function removerestatuscard(){
    for(let i=0;i<cardsdataembaralhados.length;i++){
        for(let j=0;j<2;j++){
            cardsdataembaralhados[i][j].flipped = true
        }
    }
}
function removemenufinal(){
    let menufinal = document.getElementById('menu_final')
    menufinal.style.display = 'none'
}
function newgame(){
    limpar_tabuleiro()
    cardsdataembaralhados = []
    removemenufinal()
    back_to_menu()
    controle = 0
}
function back_to_menu(){
    let initial_menu = document.getElementById('menu')
    let initial_title = document.querySelectorAll('.Game_title')
    let initial_desc = document.querySelectorAll('.Game_desc')
    let head = document.getElementById('head')
    initial_menu.style = 'display:flex;'
    initial_title[0].style = 'display:block;'
    initial_desc[0].style = 'display:block;'
    head.style = 'display:none;'
}