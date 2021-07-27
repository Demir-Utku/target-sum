import React, { useState } from 'react';
import shuffle from 'lodash.shuffle';

import Game from './Game';

const App = () => {
    const [gameId, setGameId] = useState(1);
    const resetGame = () => {
        setGameId((gameId) => gameId + 1);
    };

    const randomNumberCount = 6;
    const randomNumbers = Array.from({ length: randomNumberCount }).map(() => 1 + Math.floor(10 * Math.random()));
    const shuffledRandomNumbers = shuffle(randomNumbers);
    const target = randomNumbers.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);

    return (
        <Game
            key={gameId}
            onPlayAgain={resetGame}
            shuffledRandomNumbers={shuffledRandomNumbers}
            target={target}
            initialSeconds={15}
        />
    );
};

export default App;
