import React from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import { API_URL } from '../config'
import './App.css';
import '../style/grid.css';
import Loading from './Loading'

const socket = io(API_URL)

const providers = ['github']

class App extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })
        }
      })
  }

  render() {
    const buttons = (providers, socket) =>
      providers.map(provider =>
        <OAuth
          provider={provider}
          key={provider}
          socket={socket}
        />
      )

    return (
      <div className="App">
        <img className="logo-img" src="thedeveloperventure.png" alt="thedeveloperventure" />
        <header className="App-header">
          {this.state.loading
            ? <Loading />
            : buttons(providers, socket)
          }
        </header>
      </div>
    )
  }

}

export default App