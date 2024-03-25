const Square = ({ value, onSquareClick, isWinningSquare }) => (
    <button
        key={`square-${value}`}
        className={"square" + (isWinningSquare ? " winning" : "")}
        onClick={onSquareClick}
    >
        {value}
    </button>
)

export default Square
