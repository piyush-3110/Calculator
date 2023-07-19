import React from "react";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import './style.css'
import OperationButton from "./OperationButton";
export const ACTIONS={
  ADD_DIGIT:'add_digit',
  CHOOSE_OPERATION: 'choose_operation',
  DELETE_DIGIT: 'delete_digit',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}
function reducer(state, {type,payload}){
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite===true) return{
        ...state,    overwrite: false,
        currentOperand: payload.digit,
     
      }
      if(state.currentOperand=== '0' && payload.digit==='0') return state;
      if(payload.digit==='.'&&state.currentOperand.includes(".")) return state;
    
      return{
        ...state,currentOperand: `${state.currentOperand||""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {}
       
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand===null&&state.previousOperand===null) return state;
      if(state.previousOperand==null){
        return{
          ...state, operation: payload.operation,
          previousOperand: state.currentOperand, 
          currentOperand: null 
        } 
      }
      return{
        ...state, operation: payload.operation, 
        previousOperand: evaluate(state),
        currentOperand:null
      }
      case ACTIONS.EVALUATE:
        if(state.currentOperand===null|| state.previousOperand===null || state.operation ===null) return state
        return{
          ...state,   
          currentOperand: evaluate(state),
          previousOperand:null,
          operation:null, overwrite: true
         
        }
        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite){
            return{
              ...state, operation:null, 
              previousOperand:null,
              currentOperand:null,
              overwrite: false
            }
          }
          if(state.currentOperand==null) return state;
          if(state.currentOperand.length===1) return{
            ...state,currentOperand:null, previousOperand:null, operation:null
          }
          return {...state, currentOperand:state.currentOperand.slice(0,-1)}
break;
    default:
      break;
  }


}
function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev)||isNaN(curr)){
    return "";
  }
  let answer ="";
  switch(operation){
    case "+":
      answer= curr+prev;
      break;
    case "-":
      answer = prev-curr;
      break;

    case "/":
      answer = prev/curr;
      break;

      case "*":
        answer= prev*curr;
        break;
   default: 
   return answer.toString();
  }
  return answer.toString();
}
const App = () => {
const[{currentOperand, previousOperand, operation}, dispatch]= useReducer(reducer,{});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({
        type: ACTIONS.CLEAR
      })}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation = "/" dispatch={dispatch}/>
      <DigitButton digit = "1" dispatch={dispatch}/>
      <DigitButton digit = "2" dispatch={dispatch}/>
      <DigitButton digit = "3" dispatch={dispatch}/>
      <OperationButton operation = "*" dispatch={dispatch}/>
      <DigitButton digit = "4" dispatch={dispatch}/>
      <DigitButton digit = "5" dispatch={dispatch}/>
      <DigitButton digit = "6" dispatch={dispatch}/>
      <OperationButton operation = "+" dispatch={dispatch}/>
      <DigitButton digit = "7" dispatch={dispatch}/>
      <DigitButton digit = "8" dispatch={dispatch}/>
      <DigitButton digit = "9" dispatch={dispatch}/>
      <OperationButton operation = "-" dispatch={dispatch}/>
      <DigitButton digit = "." dispatch={dispatch}/>
      <DigitButton digit = "0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
};

export default App;
