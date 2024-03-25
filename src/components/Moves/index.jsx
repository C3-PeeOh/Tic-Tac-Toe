import { calculateWinner } from "../../utils/calculate-winner";
import { getSquareCoordinates } from "../../utils/get-square-coordinates";

const Moves = ({ sortedHistory, xIsNext, jumpTo, lastMove, sortAscending }) => {
    const descriptions = {
        [sortedHistory.length - 1]: () => {
            const { row, column } = getSquareCoordinates(lastMove);
            let description = `You are at move #${sortedHistory.length - 1}. ${!xIsNext ? "X" : "O"} placed on Row: ${row} Column: ${column}`;
            const winner = calculateWinner(sortedHistory[sortedHistory.length - 1]);
            if (winner.symbol) {
                description += " WINNER: " + winner.symbol;
            } else if (sortedHistory.length - 1 === 9) {
                description += " DRAW";
            }
            return description;
        },
        0: () => "Go to game start",
    };

    return (
        <ol>
            {sortedHistory.map((squares, move) => {
                const moveOrder = sortAscending ? move : sortedHistory.length - 1 - move;
                const description = descriptions[moveOrder] ? descriptions[moveOrder]() : `Go to move #${moveOrder}`;

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