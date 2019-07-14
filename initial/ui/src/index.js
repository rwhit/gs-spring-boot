import React from 'react';
import ReactDOM from 'react-dom';
import './ticTacToe.css';

function Square(props) {
    return (
      <button
        onClick={props.onClick}
        className={"square " + (props.highlight ? "highlight" : "normal")}
      >
        {props.value}
      </button>
    );
}

function Reset(props) {
  return (
    <button
      className = "reset"
      onClick = {props.onClick}
      >
        Reset
    </button>
  )
}

class Toggle extends React.Component {
  constructor(props) {
    // labels[], onStart(), onEnd()
    super(props)
    this.state = { started: false, }    
  }
  handleClick() {
    const started = !this.state.started;
    this.setState({ started: started });
    if (started) {
      this.props.onStart();
    } else {
      this.props.onEnd();
    }
  }
  render() {
    return <button
             className={this.state.started ? "toggle-on" : "toggle-off"}
             onClick={() => this.handleClick()}>
      { this.props.labels[ this.state.started ? 1 : 0] }
      </button>
  }
}
class Board extends React.Component {

  handleReset() {
    this.props.onReset();
  }
  
  renderSquare(i) {
    return (<Square
             value={this.props.squares[i]}
             highlight={this.props.winningSquares.includes(i)}
             onClick = {() => this.props.onClick(i)}
           />);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="footer">
          <Reset onClick={() => this.handleReset()}/>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.cleanBoard();
  }
  
  cleanBoard() {
    return {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      interval: null,
    }
  }

  handleReset() {
    this.setState(this.cleanBoard())
  }
  
  handleStartAnimate() {
    function tick(game) {
      game.jumpTo((game.state.stepNumber + 1) % game.state.history.length)
    }
    this.setState({interval: setInterval(() => tick(this), 1000)});
  }
  
  handleStopAnimate() {
    clearInterval(this.state.interval);
    this.setState({interval: null});
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0,
                                            this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat( [{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map( (step, move) => {
      const desc = move ? 
            'Go to move #' + move :
            'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    });
    let status;
    if (winner) {
      status = winner.winner + ' wins!'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'Y');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            winningSquares={ winner ?  winner.line  : [] }
            onClick={ (i) => this.handleClick(i)}
            onReset={ () => this.handleReset()}
            />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <Toggle
            labels={ ["Animate", "Stop"] }
            onStart={ () => this.handleStartAnimate() }
            onEnd={ () => this.handleStopAnimate() }
            />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
