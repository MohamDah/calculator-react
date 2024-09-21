import { useState } from 'react'
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
          newPrev = prev.slice(prev.search("=")+1);
        } else {
          newPrev = "";
        }
      } // If there's an equal sign in state, delete everything except the result if an operator is pressed, else clear state.

      
      if (key === "ac") {           
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
    const result = eval(equation);
    setEquation(prev => prev += `=${result}`)
  }

  const topDisp = equation.replaceAll("*", "·");    // replace * with · for the top display

  let bottomDisp;
  if (regSymbols.test(equation[equation.length-1])) {
    bottomDisp = equation[equation.length-1];
    bottomDisp = bottomDisp.replace("*", "X");
  } else if (equation !== "") {
    let temp = equation.split("=");
    bottomDisp = temp[temp.length-1];
  } else {
    bottomDisp = "0";
  } // if the last character in "equation" is a sybmol



  return (
    <>
    <div className='calc-container'>
      <section className='calc-disp'>
        <p className='calc-disp-top'>{topDisp}</p>
        <p className='calc-disp-bottom'>{bottomDisp}</p>
      </section>
      <div className='keypad'>
        {/* for each button click, run a function to with the key name itself as the arguement */}
          <button onClick={() => keyPress("ac")} className='ac'>AC</button>
        <button onClick={() => keyPress("/")} className='divide'>/</button>
        <button onClick={() => keyPress("*")} className='mult'>x</button>

        <button onClick={() => keyPress("7")} className='seven'>7</button>
        <button onClick={() => keyPress("8")} className='eight'>8</button>
        <button onClick={() => keyPress("9")} className='nine'>9</button>
        <button onClick={() => keyPress("-")} className='sub'>-</button>

        <button onClick={() => keyPress("4")} className='4'>4</button>
        <button onClick={() => keyPress("5")} className='5'>5</button>
        <button onClick={() => keyPress("6")} className='6'>6</button>
        <button onClick={() => keyPress("+")} className='add'>+</button>

        <button onClick={() => keyPress("1")} className='1'>1</button>
        <button onClick={() => keyPress("2")} className='2'>2</button>
        <button onClick={() => keyPress("3")} className='3'>3</button>
          <button onClick={evaluate} className='equals'>=</button>

          <button onClick={() => keyPress("0")} className='zero'>0</button>
        <button onClick={() => keyPress(".")} className='point'>.</button>
      </div>
    </div>
    <p className='credit'>
      Coded by <a href='https://github.com/MohamDah'>Mohamed Dahab</a>
      <small>Check the <a href="https://github.com/MohamDah/calculator-react">source code</a></small>
    </p>
    </>
  )
}

export default App
