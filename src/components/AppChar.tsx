import { Char } from '../models/Char';

interface IProps {
  char: Char;
  onClickChar: (char: Char, charId: number) => void;
}

export const AppChar = ({ char, onClickChar }: IProps) => {
  const handleClick = (char: Char, charId: number) => {
    onClickChar(char, charId);
  };
  return (
    <>
      <button
        disabled={char.isClicked}
        onClick={() => handleClick(char, char.id)}
      >
        {char.char}
      </button>
    </>
  );
};
