import BoardRows from "../BoardRows"
import { calculateWinner } from "../../utils/calculate-winner"

const Board = ({ xIsNext, squares, onPlay }) => {
    const winnerInfo = calculateWinner(squares)
    const winner = winnerInfo ? winnerInfo.symbol : null
    const winningLine = winnerInfo ? winnerInfo.line : null
    const isNext = () => (xIsNext ? "X" : "O")

    let status = winner ? "Winner: " + winner : `Next player: ${isNext()}`

    return (
        <>
            <BoardRows
                onPlay={onPlay}
                isNext={isNext}
                squares={squares}
                winningLine={winningLine}
                winner={winner}
            />
            <div className="status">{status}</div>
        </>
    )
}

export default Board
