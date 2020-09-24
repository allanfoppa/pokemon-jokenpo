import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import backApi from '../../services/api'
import './styles-battle.css'
import axios from 'axios'

import vsImg from '../../assets/images/pokemon-vs-80-fontmeme.png'
import rock from '../../assets/images/pokemon-rock-fontmeme.png'
import paper from '../../assets/images/pokemon-paper-fontmeme.png'
import scissors from '../../assets/images/pokemon-scissors-fontmeme.png'

export default function Battle(props) {
    const history = useHistory()
    const name_saved = localStorage.getItem('trainer_name')
    
    const choose = 'Choose your move:'
    const yourChoose = 'used: '
    
    var isShow = 'display--grid'
    var isHide = 'display--none'

    const half = 'filler-half'
    const danger = 'filler-danger'
    const empty = 'filler-empty'

    const [ pokemonPlayerOne, setpokemonPlayerOne ] = useState([])
    const [ pokemonPlayerCPU, setpokemonPlayerCPU ] = useState([])
    const [ pokemonMoves, setpokemonMoves ] = useState('')
    const [ battleText, setbattleText ] = useState('')
    const [ playerChoiceImage, setplayerChoiceImage ] = useState('')
    const [ cpuChoiceImage, setcpuChoiceImage ] = useState('')
    const [ showOrHide, setshowOrHide ] = useState('')
    const [ p1HPCount, setP1HPCount ] = useState(2)
    const [ cpuHPCount, setCpuHPCount ] = useState(2)
    const [ p1HP, setP1HP ] = useState('')
    const [ cpuHP, setCpuHP ] = useState('')
    
    const pokemonP1 = () => {
        const pokemonName = Object.values(props.location.pokemonProps)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(function(response) {
            
            let name = response.data.name
            let image = response.data.sprites.back_default
            
            const data = [
                name,
                image
            ]

            setpokemonPlayerOne(data)

            const entry = "Go! " + name + '!'
            setbattleText(entry)
            entryBattle()
        })
    }

    const pokemonCPU = () => {
        const pokemonCPUNumber = Math.floor(Math.random() * 807)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonCPUNumber}`)
        .then(function(response) {
            
            let name = response.data.name
            let image = response.data.sprites.front_default
            
            const data = [
                name,
                image
            ]

            setpokemonPlayerCPU(data)
        })

    }

    function entryBattle(){
        setTimeout(function() {
            setbattleText(choose)
            setpokemonMoves(isShow)
        }, 3000)
    }

    function handleLoseBattle(){
        
        localStorage.setItem('result', 'lose')
        const result = localStorage.getItem('result')
        
        backApi.put('/batalha', result, {
            headers: {
                PokemonTrainer: name_saved,
                Result: result
            },
        })
        .then(function(response){
            setbattleText(response.data.message)
            localStorage.removeItem('result')
        })
        .catch(function(error) {
            console.log(error)
        })
        
        setTimeout(() => {
            history.push('/home')
        }, 4000);

    }

    function handleWinBattle(){
        
        localStorage.setItem('result', 'win')
        const result = localStorage.getItem('result')
        
        backApi.put('/batalha', result, {
            headers: {
                PokemonTrainer: name_saved,
                Result: result
            },
        })
        .then(function(response){
            setbattleText(response.data.message)
            localStorage.removeItem('result')
        })
        .catch(function(error) {
            console.log(error)
        })
        
        setTimeout(() => {
            history.push('/home')
        }, 4000);

    }

    useEffect(()=>{
        pokemonP1()
        pokemonCPU()
    }, [])


    function handleBattle(firstPlayerChoice) {
        // Diminui a vida do player one
        function decrementP1HPCount(){
            setP1HPCount(p1HPCount - 1)

            if (p1HPCount === 2) {
                setP1HP(half)
            } else if (p1HPCount === 1) {
                setP1HP(danger)
            } else if (p1HPCount === 0) {
                setP1HP(empty)
                handleLoseBattle()
            }
        }
        
        // Diminui a vida da máquina
        function decrementCpuHPCount(){
            setCpuHPCount(cpuHPCount - 1)

            if (cpuHPCount === 2) {
                setCpuHP(half)
            } else if (cpuHPCount === 1) {
                setCpuHP(danger)
            } else if (cpuHPCount === 0) {
                setCpuHP(empty)
                handleWinBattle()
            }
        }

        // Imagens das escolhas
        const moves = { rock, paper, scissors }
    
        // Escolha da CPU
        const arrComputerChoice = ["rock", "paper", "scissors"];
        const computerChoice = arrComputerChoice[Math.floor(Math.random() * arrComputerChoice.length)];

        const winRound = firstPlayerChoice + ' beats ' + computerChoice
        const loseRound = firstPlayerChoice + ' loses ' + computerChoice
        const tieRound = firstPlayerChoice + ' tied ' + computerChoice

        // Esconde as escolhas do Player 1
        setpokemonMoves(isHide)
        // Mostra o texto com a escolha
        setbattleText(yourChoose + firstPlayerChoice)

        // Imprimi as escolhas com imagens na tela
        if (firstPlayerChoice === 'rock') {
            setplayerChoiceImage(moves.rock)
        } else if (firstPlayerChoice === 'paper') {
            setplayerChoiceImage(moves.paper)
        } else {
            setplayerChoiceImage(moves.scissors)
        }

        if (computerChoice === 'rock') {
            setcpuChoiceImage(moves.rock)
        } else if (computerChoice === 'paper') {
            setcpuChoiceImage(moves.paper)
        } else {
            setcpuChoiceImage(moves.scissors)
        }

        // Mostra as escolhas na tela
        setshowOrHide(isShow)

        if (firstPlayerChoice === computerChoice) {
            
            // Msg de empate
            setbattleText(tieRound)
            setTimeout(() => {
                // Esconde as escolhas
                setshowOrHide(isHide)
                // Colocar o texto para escolher
                setbattleText(choose)
                // Mostrar as escolhas para o p1
                setpokemonMoves(isShow)
            }, 4000);

        } else if (firstPlayerChoice === "rock") {
            switch (computerChoice) {
                case "scissors":
                    // Msg vencedora no round
                    setbattleText(winRound)
                    // Fazer o dano na máquina
                    decrementCpuHPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                    break;
                case "paper":
                    // Msg perdedora no round
                    setbattleText(loseRound)
                    // Fazer o dano no p1
                    decrementP1HPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                break;
            }

        } else if (firstPlayerChoice === "paper") {

            // If the player chooses "Paper"
            switch (computerChoice) {
                case "rock":
                    // Msg vencedora no round
                    setbattleText(winRound)
                    // Fazer o dano na máquina
                    decrementCpuHPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                break;
                case "scissors":
                    // Msg perdedora no round
                    setbattleText(loseRound)
                    // Fazer o dano no p1
                    decrementP1HPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                break;

            }

        } else {

            // If the player chooses "Scissors"
            switch (computerChoice) {
                case "paper":
                    // Msg vencedora no round
                    setbattleText(winRound)
                    // Fazer o dano na máquina
                    decrementCpuHPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                break;
                case "rock":
                    // Msg perdedora no round
                    setbattleText(loseRound)
                    // Fazer o dano no p1
                    decrementP1HPCount()
                    // Voltar para próximo round
                    setTimeout(() => {
                        // Esconde as escolhas
                        setshowOrHide(isHide)
                        // Colocar o texto para escolher
                        setbattleText(choose)
                        // Mostrar as escolhas para o p1
                        setpokemonMoves(isShow)
                    }, 4000);
                break;
            }

        }


    }

    return(
        <section className="battle-section">
            <div className={"player-choice display--none " + showOrHide}>
                <img src={playerChoiceImage} alt="" />
                <img src={vsImg} alt="" />
                <img src={cpuChoiceImage} alt="" />
            </div>
            <div className="info-pk-cpu">
                <p className="battle-pokemon-name">{pokemonPlayerCPU[0]} <span>:L100</span></p>
                <div className="info-pk-cpu-stats">
                    <span>HP:</span>
                    <div className="progress-bar">
                        <div className={"filler-full " + cpuHP}></div>
                    </div>
                </div>
            </div>
            <div className="pk-cpu">
                <div className="battle-ground">
                    <img src={pokemonPlayerCPU[1]} className="battle-pokemon-image"/>
                </div>
            </div>
            <div className="pk-p1">
                <img src={pokemonPlayerOne[1]} className="battle-pokemon-image"/>
            </div>
            <div className="info-pk-p1">
                <p className="battle-pokemon-name"><span id="js-battle-pokemon-name">{pokemonPlayerOne[0]}</span> <span>:L100</span></p>
                <div className="info-pk-p1-stats">
                    <span>HP:</span>
                    <div className="progress-bar">
                        <div className={"filler-full " + p1HP}></div>
                    </div>
                </div>
            </div>
            <div className="msg">
                <div className="msg-middle-border">
                    <div className="msg-inner-border msg-container">
                        <div id="js-message" className="message">{battleText}</div>
                        <div className={"moves-container " + pokemonMoves}>
                            <ul className="moves">
                                <li className="move--choose" onClick={() => handleBattle('rock')}>Rock</li>
                                <li className="move--choose" onClick={() => handleBattle('paper')}>Paper</li>
                                <li className="move--choose" onClick={() => handleBattle('scissors')}>Scissors</li>
                                <li className="move--choose" onClick={handleLoseBattle}>Quit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}