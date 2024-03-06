import { useState } from 'react';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [sortAscending, setSortAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function toggleSortOrder() {
        setSortAscending(!sortAscending);
    }

    const sortedHistory = sortAscending ? [...history] : [...history].reverse();

    const moves = sortedHistory.map((squares, move) => {
        const moveOrder = sortAscending ? move : history.length - 1 - move;
        let description;
        let winner = calculateWinner(squares);

        if (moveOrder > 0) {
            if (moveOrder + 1 === history.length) {
                description = `You are at move #${moveOrder}. ${(!xIsNext ? "X" : "O")} placed on RC` /*TODO*/
                if (winner.symbol) {
                    description += " WINNER: " + winner.symbol
                }
                else if (moveOrder === 9) {
                    description += " DRAW"
                }
            } else {
                description = 'Go to move #' + moveOrder;
            }
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(moveOrder)}>{description}</button>
            </li>
        );
    });

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
                    Toggle Sorting Order: {sortAscending ? 'Ascending' : 'Descending'}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function Square({ value, onSquareClick, isWinningSquare}) {
    return (
        <button
            className={"square" + (isWinningSquare ? " winning" : "")}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
function Board({ xIsNext, squares, onPlay }) {
    const winnerInfo = (calculateWinner(squares));
    const winner = winnerInfo ? winnerInfo.symbol : null;
    const winningLine = winnerInfo ? winnerInfo.line : null;

    let status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    function renderSquare(i, isWinningSquare) {
        return (
            <Square
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                isWinningSquare={isWinningSquare}
            />
        );
    }

    function renderRow(row, winningSquares) {
        const startIndex = row * 3;
        const endIndex = startIndex + 3;
        const rowSquares = [];
        for (let i = startIndex; i < endIndex; i++) {
            const isWinningSquare = winningSquares && winningSquares.includes(i);
            rowSquares.push(renderSquare(i, isWinningSquare));
        }
        return <div className="board-row">{rowSquares}</div>;
    }

    const boardRows = [];
    for (let i = 0; i < 3; i++) {
        boardRows.push(renderRow(i, winningLine));
    }

    return (
        <>
            {boardRows}
            <div className="status">{status}</div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { symbol: squares[a], line: [a, b, c] };
        }
    }
    return { symbol: null, line: null };
}