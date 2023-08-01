import { Char } from '../models/Char';
import { SecretWord } from '../models/SecretWord';
import { AppChar } from './AppChar';

interface IProps {
  chars: Char[];
  word: SecretWord[];
  guessCount: number;
  onClickChar: (char: Char, charId: number) => void;
}

export const AppGame = ({ chars, word, onClickChar, guessCount }: IProps) => {
  const clickChar = (char: Char, charId: number) => {
    console.log(charId);

    onClickChar(char, charId);
  };

  return (
    <>
      <div className='board'>
        {word.map((word, index) => (
          <div key={index} className='word-container'>
            {!word.isCorrect ? (
              <p className='hidden'></p>
            ) : (
              <p className='shown'>{word.letter}</p>
            )}
          </div>
        ))}
      </div>
      <div className='keyboard'>
        {chars.map((char) => (
          <AppChar key={char.id} char={char} onClickChar={clickChar} />
        ))}
      </div>
      <div className='img-container'>
        <img
          src={`/images/${guessCount}.jpg`}
          alt='hangman '
          width={200}
          height={200}
        />
      </div>
    </>
  );
};
