const getN = (index, n) => (index - n) >= 0 ? index - n : null;

const getE = (index, n) => (index + 1) < n * n && (index + 1)%n !== 0 ? index + 1 : null;

const getS = (index, n) => (index + n) < n * n ? index + n : null;

const getW = (index, n) => (index - 1) >= 0 && index%n !== 0 ? index - 1 : null;

const getNE = (index, n) => (index - n - 1) >= 0 && (index + 1)%n !== 0 ? index - n - 1 : null;

const getNW = (index, n) => (index - n + 1) >= 0 && index%n !== 0 ? index - n + 1 : null;

const getSE = (index, n) => (index + n + 1) < n * n && (index + 1)%n !== 0 ? index + n + 1 : null;

const getSW = (index, n) => (index + n - 1) < n * n && index%n !== 0 ? index + n - 1 : null;

const recursiveCheck = (targetValue, endValue, array, index, n) => {
  const getAdjacentCells = [getN, getE, getS, getW, getNE, getSE, getNW, getSW];
  if (array[index] === endValue) {
    let count = 0;
    for (const getDirection of getAdjacentCells) {
      const adjacentCell = getDirection(index, n);
      if (array[adjacentCell] === targetValue) count++; 
      if (array[adjacentCell] === endValue) recursiveCheck(targetValue, endValue, array, adjacentCell, n);
    }
    array[index] = count;
  }
};

export const createNewBoard = (n = 10, mines = 10) => {
  const board = new Array(n * n).fill('x');
  const random = () => Math.floor(Math.random() * n * n);

  for (let i = 0; i < mines; i++) {
    const mine = random();
    board[mine] = -100;
  }

  recursiveCheck(-100, 'x', board, 0, n);

  return board;
};

export const selectCell = (index, board) => {
  // if index value === -100 then lose reveal all
  // if index value === 0, reveal entire area of zeros (horizontal and vertical 0 only) outline of numbers
  // recursively check surroundings for 0, push each 0 to revealed indices until not 0 (push that one too)
  // if index value !== -100 then return array of revealed indices
};