import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import { useState } from 'react';

function App() {
  const btnValues = [
    ['C', '+-', '%', '/'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '='],
  ];

  const [calc, setCalc] = useState({
    sign: '',
    number: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.number).length < 16) {
      setCalc({
        ...calc,
        number:
          calc.number === 0 && value === ''
            ? '0'
            : removeSpaces(calc.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.number + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      number: !calc.number.toString().includes('.')
        ? calc.number + value
        : calc.number,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.number ? calc.number : calc.res,
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.number) {
      const math = (a, b, sign) =>
        sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === 'X'
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.number === '0' && calc.sign === '/'
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.number)),
                  calc.sign
                )
              ),
        number: 0,
        sign: '',
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      number: calc.number ? toLocaleString(removeSpaces(calc.number)) * -1 : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : 0,
      sign: '',
    });
  };

  const percentClickHandler = () => {
    let num = calc.number ? parseFloat(removeSpaces(calc.number)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      number: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      number: 0,
      res: 0,
      sign: '',
    });
  };

  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

  const removeSpaces = (num) => num.toString().replace(/\s/g, '');

  return (
    <div className='App'>
      <Wrapper>
        <Screen value={calc.number ? calc.number : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === '=' ? 'equals' : ''}
                value={btn}
                onClick={
                  btn === 'C'
                    ? resetClickHandler
                    : btn === '+-'
                    ? invertClickHandler
                    : btn === '%'
                    ? percentClickHandler
                    : btn === 'X' || btn === '-' || btn === '+' || btn === '/'
                    ? signClickHandler
                    : btn === '='
                    ? equalsClickHandler
                    : btn === '.'
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;
