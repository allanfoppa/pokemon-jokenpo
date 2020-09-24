import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import handleWithErrorOnSubmit from '../../helpers/handleWithErrorOnSubmit'

import backApi from '../../services/api'

import logoImg from '../../assets/images/pokemon-logo-fontmeme.png'

export default function Logon() {

    const history = useHistory()

    const [ trainer_name, setTrainerName ] = useState('')
    const [ trainer_pw, setTrainerPw ] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await backApi.post('entrar', { trainer_name, trainer_pw })

            if (response.data.find === true) {
                localStorage.setItem('trainer_name', trainer_name)
                history.push('/home')
            } else {
                handleWithErrorOnSubmit()
            }
        } catch (error) {
            handleWithErrorOnSubmit()
        }
    }

    return(
		<section id="login-container">
            <form onSubmit={handleLogin} className="login-container__inner">

                <img src={logoImg} alt="Logo"/>

                <div className="login-container__inner-form-fields">
                    <h1 className="login-container__inner-title">Faça seu login</h1>

                    <label className="login-container__inner-label">Nome do Treinador(a)</label>
                    <input
                        data-cy="email-login"
                        className="login-container__inner-input"
                        value={trainer_name}
                        onChange={e => setTrainerName(e.target.value)}
                    />

                    <label className="login-container__inner-label">Senha do Treinador(a)</label>
                    <input
                        data-cy="password-login"
                        className="login-container__inner-input"
                        type="password"
                        value={trainer_pw}
                        onChange={e => setTrainerPw(e.target.value)}
                    />

                    <button
                        data-cy="enter-login"
                        className="button">
                            entrar
                    </button>

                    <Link to="/cadastrar" className="login-container__inner-link">
                        <FiLogIn size={16} color="#356abc" />
                        Ainda não sou trainer
                    </Link>
                </div>

            </form>
        </section>
    )
}