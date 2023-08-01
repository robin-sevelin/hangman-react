import { useEffect, useState } from 'react';
import { AppGame } from './AppGame';
import { Game } from '../models/Game';
import { Char } from '../models/Char';
import { SecretWord } from '../models/SecretWord';

export const AppMain = () => {
  const [game, setGame] = useState<Game>({
    isStarted: false,
    hasWinner: false,
    hasLoser: false,
  });
  const [chars, setChars] = useState<Char[]>([]);
  const [word, setWord] = useState<SecretWord[]>([]);
  const [guess, setGuess] = useState('');
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    checkGuess();

    return () => {
      setGuess('');
    };
  }, [guess]);

  const startGame = () => {
    setGame((game) => {
      return { ...game, isStarted: true };
    });

    setKeyboard();
    setSecretWord();
  };

  const checkLoss = () => {
    if (guessCount === 11) {
      setGame((game) => {
        return { ...game, hasLoser: true };
      });
    }
  };

  const checkWin = () => {
    if (word.length > 0 && word.every((word) => word.isCorrect === true)) {
      setGame((game) => {
        return { ...game, hasWinner: true };
      });
    }
  };

  const setKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzpåäö';

    const keyBoard: Char[] = alphabet.split('').map((char) => {
      return { char: char, id: Math.random(), isClicked: false };
    });
    setChars(keyBoard);
  };

  const setSecretWord = () => {
    const words: string[] = [
      'kyckling',
      'lastbil',
      'båt',
      'katt',
      'hund',
      'cykel',
      'pokemon',
      'majskolv',
      'schampo',
    ];
    const randomIndex = Math.floor(Math.random() * words.length);

    const randomWord: SecretWord[] = words[randomIndex]
      .split('')
      .map((word) => {
        return { letter: word, isCorrect: false };
      });

    setWord(randomWord);
  };

  const clickChar = (char: Char, charId: number) => {
    if (game.hasLoser || game.hasWinner) {
      return;
    }
    const clickedChar = chars.map((char) => {
      if (charId === char.id) {
        return { ...char, isClicked: true };
      } else {
        return char;
      }
    });
    setChars(clickedChar);
    setGuess(char.char);
    checkGuess();
  };

  const checkGuess = () => {
    if (guess) {
      if (word.length > 0 && word.some((word) => word.letter === guess)) {
        setWord(
          word.map((word) => {
            if (word.letter === guess) {
              return { ...word, isCorrect: true };
            } else {
              return word;
            }
          })
        );
      } else {
        setGuessCount((guessCount) => guessCount + 1);
      }
    }
    checkWin();
    checkLoss();
  };

  const quitGame = () => {
    setGuessCount(0);
    setGame((game) => {
      return { ...game, isStarted: false, hasLoser: false, hasWinner: false };
    });
  };

  return (
    <main>
      {!game.isStarted ? (
        <button onClick={startGame}>Starta spelet</button>
      ) : (
        <div>
          <AppGame
            word={word}
            guessCount={guessCount}
            chars={chars}
            onClickChar={clickChar}
          />

          {game.hasLoser && <p>Gubben är hängd 👻</p>}
          {game.hasWinner && <p>Grattis du vann 🥇</p>}
          <div className='site-nav'>
            <button onClick={quitGame}>Avsluta</button>
          </div>
        </div>
      )}
    </main>
  );
};
