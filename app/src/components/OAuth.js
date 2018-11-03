import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { API_URL } from '../config'
import Story from './story.js'

export default class OAuth extends Component {

    state = {
        user: {},
        disabled: ''
    }

    componentDidMount() {

        this.setState({ user: JSON.parse(localStorage.getItem('userData')) || {} })

        const { socket, provider } = this.props

        socket.on(provider, user => {
            this.popup.close()
            this.setState({ user })

            const userData = {
                name: user.name,
                photo: user.photo,
                user: user.user
            }

            localStorage.setItem('userData', JSON.stringify(userData))
        })

    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({ disabled: '' })
            }
        }, 1000)
    }

    openPopup() {
        const { provider, socket } = this.props
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {

        if (!this.state.user !== {} && !this.state.disabled) {
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({ disabled: 'disabled' })
        }
    }

    closeCard = () => {
        this.setState({ user: {} })
        localStorage.clear()
    }

    render() {
        const { name, photo } = this.state.user

        const githubLogoSvg = <svg height="40" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        const loginButton = <button className="btn-login" onClick={this.startAuth}>Sign in With Github{githubLogoSvg}</button>

        return (
            name
                ?
                <div>
                    <Story user={this.state.user} />

                    <button className="avatar" onClick={this.closeCard}>
                        <img className="avatar-img" src={photo} alt={name} />
                        <span className="btn-logout">Logout</span>
                        <p className="avatar-nickname">{name}</p>
                    </button>
                </div>
                :
                loginButton

        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
}