import { calculateWinner } from "../../utils/calculate-winner"
import { getSquareCoordinates } from "../../utils/get-square-coordinates"

const Moves = ({ sortedHistory, xIsNext, jumpTo, lastMove, sortAscending }) => {
    return (
        <ol>
            {sortedHistory.map((squares, move) => {
                const moveOrder = sortAscending ? move : sortedHistory.length - 1 - move;
                let description;
                let winner = calculateWinner(squares);

                switch (moveOrder) {
                    case sortedHistory.length - 1:
                        const { row, column } = getSquareCoordinates(lastMove);
                        description = `You are at move #${moveOrder}. ${!xIsNext ? "X" : "O"} placed on Row: ${row} Column: ${column}`;
                        if (winner.symbol) {
                            description += " WINNER: " + winner.symbol;
                        } else if (moveOrder === 9) {
                            description += " DRAW";
                        }
                        break;
                    case 0:
                        description = "Go to game start";
                        break;
                    default:
                        description = "Go to move #" + moveOrder;
                }

                return (
                    <li key={move}>
                        <button onClick={() => jumpTo(moveOrder)}>{description}</button>
                    </li>
                );
            })}
        </ol>
    );
};

export default Moves;