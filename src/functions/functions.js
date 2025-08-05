export function getShuffledCards(cards) {
  const shuffled = [...cards]; // clone the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function distribute(length, cards) {
  const player4Cards = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
  const player3Cards = [
    0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45,
  ];

  const cards3 = {
    1: [],
    2: [],
    3: [],
  };

  const cards4 = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

  if (length === 4) {
    player4Cards?.forEach((element) => {
      cards4[1].push(cards[element]);
      cards4[2].push(cards[element + 1]);
      cards4[3].push(cards[element + 2]);
      cards4[4].push(cards[element + 3]);
    });
    return { ...cards4 };
  } else {
    player3Cards?.forEach((element) => {
      cards3[1].push(cards[element]);
      cards3[2].push(cards[element + 1]);
      cards3[3].push(cards[element + 2]);
    });
    return { ...cards3 };
  }
}

export function getNewPosition(position , nextRoundId) {
  const pos = {
    2: {
      1: 1,
      4: 2,
      3: 3,
      2: 4,
    },
    3: {
      4: 1,
      1: 2,
      2: 3,
      3: 4,
    },
    4: {
      3: 1,
      2: 2,
      1: 3,
      4: 4,
    },
    1: {
      2: 1,
      3: 2,
      4: 3,
      1: 4,
    },
  };

  

  return pos[nextRoundId][position];
}
