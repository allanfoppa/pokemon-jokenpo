import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import handleWithErrorOnSubmit from '../../helpers/handleWithErrorOnSubmit'

import webservice from '../../services/api'

import logoImg from '../../assets/images/pokemon-logo-fontmeme.png'

export default function Register() {

    const history = useHistory()

    const [ trainer_name, setTrainerName ] = useState('')
    const [ trainer_pw, setTrainerPw ] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

        try {
            const response = await webservice.post('cadastrar', { trainer_name, trainer_pw })

            localStorage.setItem('trainer_name', response.data.trainer_name)

            history.push('/home')
        } catch (error) {
            handleWithErrorOnSubmit()
        }
    }

    return(
		<section id="login-container">
            <form onSubmit={handleRegister} className="login-container__inner">

                <img src={logoImg} alt="Logo"/>

                <div className="login-container__inner-form-fields">
                    <h1 className="login-container__inner-title">Faça seu cadastro</h1>

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

                    <button data-cy="press-button" className="button">cadastrar</button>

                    <Link to="/" className="login-container__inner-link">
                        <FiArrowLeft size={16} color="#356abc" />
                        Já sou trainer
                    </Link>
                </div>

            </form>
        </section>
    )
}