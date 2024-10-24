import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [equation, setEquation] = useState("");  // holds a string with the equation

  const regSymbols = /[\+\-\*\/\=]/;    // regex to identify operators

  function keyPress(key) {              // update "equation" every key press

    setEquation(prev => {
      let newPrev = prev.slice();     // make an initial copy of previous state

      if (prev.search("=") !== -1) {
        if (regSymbols.test(key)) {
          newPrev = prev.slice(prev.search("=") + 1);
        } else {
          newPrev = "";
        }
      } // If there's an equal sign in state, delete everything except the result if an operator is pressed, else clear state.


      if (key === "ac" || key === "Backspace") {
        return "";
      } else if (newPrev.length > 0 && regSymbols.test(key) && regSymbols.test(newPrev[newPrev.length - 1])) {
        return newPrev.slice(0, -1) + key;
      } else {
        return newPrev += key;
      } // if AC is clicked, clear the equation,
      // else if the last character in the equation is an operator, and the user presses another operator, replace the operator instead of add.
      // else just push the character.
    })



  }

  function evaluate() {
    if (!regSymbols.test(equation[equation.length - 1]) && !regSymbols.test(equation[0])) {
      const result = eval(equation);
      setEquation(prev => prev + `=${result}`)
    }
  }

  const topDisp = equation.replaceAll("*", "·");    // replace * with · for the top display

  let bottomDisp;
  if (regSymbols.test(equation[equation.length - 1])) {
    bottomDisp = equation[equation.length - 1];
    bottomDisp = bottomDisp.replace("*", "X");
  } else if (equation !== "") {
    let temp = equation.split(regSymbols);
    bottomDisp = temp[temp.length - 1];
  } else {
    bottomDisp = "0";
  } // if the last character in "equation" is a sybmol, display the symbol
  // if equation is not empty, display last number or result


  function handleKeyDown(e) { // Make it so that the user can use the calculator through keyboard input
    const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "Backspace"]
    if (keys.includes(e.key)) {
      keyPress(e.key)
    } else if (e.key === "Enter") {
      evaluate()
    }
  }

  return (
    <>
      <div onKeyDown={handleKeyDown} className='calc-container'>
        <section className='calc-disp'>
          <p className='calc-disp-top'>{topDisp}</p>
          <p className='calc-disp-bottom'>{bottomDisp}</p>
        </section>
        <div className='keypad'>
          {/* for each button click, run a function to with the key name itself as the arguement */}
          <button onMouseDown={() => keyPress("ac")} className='ac'>AC</button>
          <button onMouseDown={() => keyPress("/")} className='divide'>/</button>
          <button onMouseDown={() => keyPress("*")} className='mult'>x</button>

          <button onMouseDown={() => keyPress("7")} className='seven'>7</button>
          <button onMouseDown={() => keyPress("8")} className='eight'>8</button>
          <button onMouseDown={() => keyPress("9")} className='nine'>9</button>
          <button onMouseDown={() => keyPress("-")} className='sub'>-</button>

          <button onMouseDown={() => keyPress("4")} className='4'>4</button>
          <button onMouseDown={() => keyPress("5")} className='5'>5</button>
          <button onMouseDown={() => keyPress("6")} className='6'>6</button>
          <button onMouseDown={() => keyPress("+")} className='add'>+</button>

          <button onMouseDown={() => keyPress("1")} className='1'>1</button>
          <button onMouseDown={() => keyPress("2")} className='2'>2</button>
          <button onMouseDown={() => keyPress("3")} className='3'>3</button>
          <button onMouseDown={evaluate} className='equals'>=</button>

          <button onMouseDown={() => keyPress("0")} className='zero'>0</button>
          <button onMouseDown={() => keyPress(".")} className='point'>.</button>
        </div>
      </div>
      <p className='credit'>
        Coded by <a target="_blank" href='https://github.com/MohamDah'>Mohamed Dahab</a>
        <small>Check the <a target="_blank" href="https://github.com/MohamDah/calculator-react">source code</a></small>
      </p>
    </>
  )
}

export default App
