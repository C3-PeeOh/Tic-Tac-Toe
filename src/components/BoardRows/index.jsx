import Square from "../Square"

const BoardRows = ({ onPlay, isNext, squares, winningLine, winner }) => {
    function handleClick(squareIndex) {
        if (!squares[squareIndex] && !winner) {
            const nextSquares = [...squares]
            nextSquares[squareIndex] = isNext()
            onPlay(nextSquares, squareIndex)
        }
    }
    const renderRow = (row, winningSquares) => {
        const startIndex = row * 3
        const endIndex = startIndex + 3
        const rowSquares = []
        for (let i = startIndex; i < endIndex; i++) {
            const isWinningSquare = winningSquares && winningSquares.includes(i)
            rowSquares.push(
                <Square
                    key={`square-${i}`}
                    value={squares[i]}
                    onSquareClick={() => handleClick(i)}
                    isWinningSquare={isWinningSquare}
                />
            )
        }
        return (
            <div className="board-row" key={`row-${row}`}>
                {rowSquares}
            </div>
        )
    }

    const boardRows = []
    for (let i = 0; i < 3; i++) {
        boardRows.push(renderRow(i, winningLine))
    }

    return boardRows
}

export default BoardRows
