import { useState } from "react"
import Board from "./components/Board"
import { calculateWinner } from "./utils/calculate-winner"
import { getSquareCoordinates } from "./utils/get-square-coordinates"

const App = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const [sortAscending, setSortAscending] = useState(true)
    const [lastMove, setLastMove] = useState(0)
    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares, squareIndex) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setLastMove(squareIndex + 1)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    function toggleSortOrder() {
        setSortAscending(!sortAscending)
    }

    const sortedHistory = sortAscending ? [...history] : [...history].reverse()

    const Moves = sortedHistory.map((squares, move) => {
        const moveOrder = sortAscending ? move : history.length - 1 - move
        let description
        let winner = calculateWinner(squares)

        if (moveOrder) {
            if (moveOrder + 1 === history.length) {
                const { row, column } = getSquareCoordinates(lastMove)
                description = `You are at move #${moveOrder}. ${!xIsNext ? "X" : "O"} placed on Row: ${row} Column: ${column}`
                if (winner.symbol) {
                    description += " WINNER: " + winner.symbol
                } else if (moveOrder === 9) {
                    description += " DRAW"
                }
            } else {
                description = "Go to move #" + moveOrder
            }
        } else {
            description = "Go to game start"
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(moveOrder)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <button onClick={toggleSortOrder}>
                    Toggle Sorting Order:{" "}
                    {sortAscending ? "Ascending" : "Descending"}
                </button>
                <ol>{Moves}</ol>
            </div>
        </div>
    )
}

export default App
