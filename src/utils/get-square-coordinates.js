export const getSquareCoordinates = (squareIndex) => {
    const row = Math.ceil(squareIndex / 3)
    const column = squareIndex % 3 || 3
    return { row, column }
}
