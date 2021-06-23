const getN = (index, n) => (index - n) >= 0 ? index - n : null;

const getE = (index, n) => (index + 1) < n * n && (index + 1)%n !== 0 ? index + 1 : null;

const getS = (index, n) => (index + n) < n * n ? index + n : null;

const getW = (index, n) => (index - 1) >= 0 && index%n !== 0 ? index - 1 : null;

const getNE = (index, n) => (index - n - 1) >= 0 && (index + 1)%n !== 0 ? index - n - 1 : null;

const getNW = (index, n) => (index - n + 1) >= 0 && index%n !== 0 ? index - n + 1 : null;

const getSE = (index, n) => (index + n + 1) < n * n && (index + 1)%n !== 0 ? index + n + 1 : null;

const getSW = (index, n) => (index + n - 1) < n * n && index%n !== 0 ? index + n - 1 : null;

const fillBoard = (targetValue, endValue, array, index, n) => {
  const getAdjacentCells = [getN, getE, getS, getW, getNE, getSE, getNW, getSW];
  if (array[index] === endValue) {
    let count = 0;
    for (const getDirection of getAdjacentCells) {
      const adjacentCell = getDirection(index, n);
      if (array[adjacentCell] === targetValue) count++; 
    }

    array[index] = count;

    for (const getDirection of getAdjacentCells) {
      const adjacentCell = getDirection(index, n);
      if (array[adjacentCell] === endValue) fillBoard(targetValue, endValue, array, adjacentCell, n);
    }
  }
};

const fillReveal = (targetValue, board, revealed, index, n) => {
  const getAdjacentCells = [getN, getE, getS, getW, getNE, getSE, getNW, getSW];
  if (board[index] === targetValue) {
    revealed[index] = 1;
    for (const getDirection of getAdjacentCells) {
      const adjacentCell = getDirection(index, n);
      if (board[adjacentCell] === targetValue) {
        fillReveal(targetValue, board, revealed, adjacentCell, n);
      } else if (board[adjacentCell]) {
        revealed[adjacentCell] = 1;
      }
    }
  }
};

export const createNewBoard = (n = 10, mines = 10) => {
  const board = new Array(n * n).fill('x');
  const random = () => Math.floor(Math.random() * n * n);

  for (let i = 0; i < mines; i++) {
    const mine = random();
    board[mine] = -100;
  }

  fillBoard(-100, 'x', board, 0, n);
  return board;
};

export const selectCell = (index, board, revealed, n) => {
  if (board[index] === -100) {
    const newRevealed = new Array(revealed.length).fill(1);
    return { revealed: newRevealed, status: false };
  } else if (board[index] === 0) {
    const newRevealed = fillReveal(0, [...board], [...revealed], index, n);
    return { revealed: newRevealed };
  } else {
    const newRevealed = [...revealed];
    newRevealed[index] = 1;
    return newRevealed;
  }
};