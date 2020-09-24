import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import backApi from '../../services/api'
import { FiTrash2, FiLogOut, FiSearch } from 'react-icons/fi'
import axios from 'axios'

import logoImg from '../../assets/images/pokemon-logo-fontmeme.png'
import battleImg from '../../assets/images/pokemon-battle-fontmeme.png'

export default function Home(){
    const history = useHistory()
    const name_saved = localStorage.getItem('trainer_name')
    console.log(name_saved)

    var isShow = 'display--grid'
    var isHide = 'display--none'

    const [ trainer_victories, setVictories ] = useState(0)
    const [ trainer_defeats, setDefeats ] = useState(0)
    const [ pokemonTeam, setTeam ] = useState([])
    const [ pokemoninfowanted, setPokemonInfoWanted ] = useState('')
    const [ hasPokemon, setIsHideOrShow ] = useState('')
    const [ hasPokemonSearch, setIsHideOrShowSearch ] = useState('')
    const [ wantedPokemonByName, setWantedPokemonByName ] = useState('')
    const [ wantedPokemonByNumber, setWantedPokemonByNumber ] = useState('')

    async function handleSearchPokemon(e){
        e.preventDefault()

        axios.get(`https://pokeapi.co/api/v2/pokemon/` + (wantedPokemonByName !== '' ? wantedPokemonByName : wantedPokemonByNumber))
        .then(response => {
            const isTwoTypes = response.data.types

            const p = response.data.id
            const o = response.data.name
            const k = response.data.types[0].type.name
            const e = response.data.sprites.front_default
            if (isTwoTypes.length > 1) {
                let mon = response.data.types[1].type.name
                var arrPokemon = [ p, o, k, e , mon ]
            } else {
                var arrPokemon = [ p, o, k, e ]
            }

            setPokemonInfoWanted(arrPokemon)
            setIsHideOrShowSearch(isShow)
        })
        .catch(function (error) {
            console.log(error);
            alert('O pokemon pesquisado não existe, tente novamente.')
        })
    }

    async function handleHelpSearch(p){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${p}`)
            .then(function (response) {
                const id = 1
                const name = response.data.name
                const type1 = response.data.types[0].type.name
                const img = response.data.sprites.front_default

                const isTwoTypes = response.data.types

                if (isTwoTypes.length > 1) {
                    var type2 = response.data.types[1].type.name
                    var pokemoninfowanted = [id, name, type1, img, type2]
                } else {
                    var pokemoninfowanted = [id, name, type1, img]
                }


                setPokemonInfoWanted(pokemoninfowanted)
                
                setIsHideOrShowSearch(isShow)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
            })
    }

    async function handleChoosePokemon(pokeName){
        const pokemon_name = pokemonTeam[2]
        const pokemon_trainer = name_saved

        try {
            await backApi.delete('home', {
                headers: {
                    PokemonTrainer: pokemon_trainer,
                    PokemonName: pokemon_name,
                },
            })

            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then(function (response) {
                const id = response.data.id
                const name = response.data.name
                const type1 = response.data.types[0].type.name
                const img = response.data.sprites.front_default

                const isTwoTypes = response.data.types

                if (isTwoTypes.length > 1) {
                    var type2 = response.data.types[1].type.name
                    var pokemoninfo = [id, img, name, type1, type2]
                } else {
                    var pokemoninfo = [id, img, name, type1]
                }

                setTeam(pokemoninfo)
                
                setIsHideOrShow(isShow)

                const data = {
                    pokemon_name: name
                }

                backApi.post('home', data, {
                    headers: {
                        PokemonTrainer: pokemon_trainer,
                    },
                })
                .then(function (response) {

                })
                .catch(function (error) {
                    // handle error
                    console.log(error)
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error)
            })
            
        } catch (error) {
            alert(error)
        }


    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    function handleIfHasSavedPokemon(pokemonName){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(function (response) {
            const id = 1
            const name = response.data.name
            const type1 = response.data.types[0].type.name
            const img = response.data.sprites.front_default

            const isTwoTypes = response.data.types

            if (isTwoTypes.length > 1) {
                var type2 = response.data.types[1].type.name
                var pokemoninfo = [id, img, name, type1, type2]
            } else {
                var pokemoninfo = [id, img, name, type1]
            }
            setIsHideOrShow(isShow)
            setTeam(pokemoninfo)                
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    async function handleDeletePokemon(){
        const pokemon_name = pokemonTeam[2]
        const pokemon_trainer = name_saved

        try {
            await backApi.delete('home', {
                headers: {
                    PokemonTrainer: pokemon_trainer,
                    PokemonName: pokemon_name,
                },
            })
            setIsHideOrShow(isHide)
            cleanFormValues()
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        backApi.get('home', {
            headers: {
                PokemonTrainer: name_saved,
            }
        }).then(response => {
            console.log(response)
            setVictories(response.data[0].trainer_victories)
            setDefeats(response.data[0].trainer_defeats)

            const trainerHasPokemon = response.data[0].pokemon

            if (trainerHasPokemon != '') {
                handleIfHasSavedPokemon(response.data[0].pokemon)
            } else {
                setIsHideOrShow(isHide)
            }
        })
    }, [name_saved])

    function cleanFormValues() {
        setWantedPokemonByName('')
        setWantedPokemonByNumber('')
    }

    return(
        <section className="i-choose-you">
            <header className="header-app">
                <div>
                    <img src={logoImg} alt="Pokemon JoKenPo" className="header-app-logo"/>
                    <h1 className="trainer-home--info">Trainer: {name_saved} W:{trainer_victories} L:{trainer_defeats} | <FiLogOut onClick={handleLogout}></FiLogOut></h1>
                </div>
                <Link to={{ pathname: '/batalha', pokemonProps: { pokemon: pokemonTeam[2] } }}>
                    <img src={battleImg} alt="Ir para a batalha" className={"battle-image display--none " + hasPokemon} />
                </Link>
            </header>
            <aside className="filters">
                <h4 className="trainer-home--title-filter">FILTERS</h4>
                {/* TODO: Colocar um cookie para usuários que nao queiram ver isso */}
                <p className="sugestion-text">Don't you know pokémon? here are some suggestions to get started</p>
                <ul className="sugestion-list">
                    <li onClick={() => handleHelpSearch('bulbasaur')}>bulbasaur</li>
                    <li onClick={() => handleHelpSearch('charmander')}>charmander</li>
                    <li onClick={() => handleHelpSearch('squirtle')}>squirtle</li>
                    <li onClick={() => handleHelpSearch('48')}>48</li>
                    <li onClick={() => handleHelpSearch('96')}>96</li>
                    <li onClick={() => handleHelpSearch('698')}>698</li>
                </ul>

                <form onSubmit={handleSearchPokemon} id="search-pokemon-form" className="search-pokemon-form">

                    <label className="trainer-home--label-filter">By name</label>
                    <input
                        type="text"
                        className="login-container__inner-input"
                        value={wantedPokemonByName}
                        onChange={e => setWantedPokemonByName(e.target.value)}
                        onFocus={cleanFormValues}
                    />

                    <label className="trainer-home--label-filter">By Number</label>
                    <input
                        type="text"
                        className="login-container__inner-input"
                        value={wantedPokemonByNumber}
                        onChange={e => setWantedPokemonByNumber(e.target.value)}
                        onFocus={cleanFormValues}
                    />

                    <button onClick={handleSearchPokemon} className="button-alt">
                        <FiSearch width='16px' className="icon-alt"></FiSearch>
                        search
                    </button>
                </form>

                <div className={"current-pokemon " + hasPokemon}>
                    <h4 className="trainer-home--title-filter">CURRENT POKÉMON</h4>
                    <ul>
                        <li key={pokemonTeam[0]}>
                            <div className="current-pokemon-inner-container">
                                <img src={pokemonTeam[1]} alt={pokemonTeam[2]} className="current-pokemon-image"/>
                                <div>
                                    <p className="current-pokemon-name">{pokemonTeam[2]} <FiTrash2 onClick={handleDeletePokemon} width="16" color="#FF0000"></FiTrash2></p>
                                    <span className={'type-' + pokemonTeam[3]}>{pokemonTeam[3]}</span>
                                    <span className={'type-' + pokemonTeam[4]}>{pokemonTeam[4]}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className={"pokemon-team " + hasPokemonSearch}>
                <div>
                    <div>
                        <p className="pokemon-name-info">{pokemoninfowanted[1]} <span className="pokemon-number-info">Nº {pokemoninfowanted[0]}</span></p>
                        <span className={'type-' + pokemoninfowanted[2]}>{pokemoninfowanted[2]}</span>
                        <span className={'type-' + pokemoninfowanted[4]}>{pokemoninfowanted[4]}</span>
                    </div>
                    <div>
                        <img src={pokemoninfowanted[3]} alt={pokemoninfowanted[1]} className="current-pokemon-image"/>
                    </div>

                    <button className="pokemon-choose button" onClick={() => handleChoosePokemon(pokemoninfowanted[1])}>I choose you</button>
                </div>
                <div></div>
                </main>
        </section>
    )
}