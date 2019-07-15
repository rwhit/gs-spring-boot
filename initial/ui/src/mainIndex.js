import React from 'react'
import { Link } from 'react-router-dom'
// for playing in console only
import index from './reactStore'

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Main Index</h1>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ticTacToe">Tic Tac Toe</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Index
