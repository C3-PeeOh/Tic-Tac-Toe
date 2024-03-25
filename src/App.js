import { useState } from "react"
import Board from "./components/Board"
import Moves from "./components/Moves"
import ToggleSortButton from "./components/ToggleSortButton"

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
                <ToggleSortButton
                    toggleSortOrder={toggleSortOrder}
                    sortAscending={sortAscending}
                />
                <Moves
                    sortedHistory={sortedHistory}
                    xIsNext={xIsNext}
                    jumpTo={jumpTo}
                    lastMove={lastMove}
                    sortAscending={sortAscending}
                />
            </div>
        </div>
    )
}

export default App
