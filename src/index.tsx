import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import { log } from 'console';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Calculator></Calculator>

);
document.addEventListener('keyup',(event:KeyboardEvent)=>{
  //console.log("event!!"+event.key)
  let button:HTMLElement = document.getElementById(event.key) as HTMLElement;
  button?.click();
})
export default function Calculator(){
  const[input, setInput] = useState("");
  const[result, setResult] = useState(0);
  const[history, setHistory] = useState("");
  const[darkTheme, setTheme] = useState(false);
  
  return(<div id='calc' data-darkTheme={darkTheme}>
    <Button darkTheme={darkTheme} keyName='t' name='сменить тему' callback={()=>{setTheme(!darkTheme)}}></Button>
    Результат:
    <div id='display'>{result}</div>  
    Ввод:
    <div id='input'>{input}</div>
    <Controls darkTheme={darkTheme} history={history} setHistory ={setHistory} setResult = {setResult} input = {input} setInput = {setInput}></Controls>
    История:
    <div id = 'history'>{history}</div>    
  </div>)
}

function Controls(
  {input, 
  darkTheme,
  history,
  setInput,
  setResult,
  setHistory}:
  {input:string,
  darkTheme:boolean,
  history:string,
  setInput:React.Dispatch<React.SetStateAction<string>>,
  setResult:React.Dispatch<React.SetStateAction<number>>,
  setHistory:React.Dispatch<React.SetStateAction<string>>,  
})
  {  
  return(
  <div id='controls'>
      <Button darkTheme = {!darkTheme} keyName="1" name="1" callback = {() =>{setInput(input+"1")}}/>
      <Button darkTheme = {!darkTheme} keyName="2" name="2" callback = {() =>{setInput(input+"2")}}/>
      <Button darkTheme = {!darkTheme} keyName="3" name="3" callback = {() =>{setInput(input+"3")}}/>
      <Button darkTheme = {!darkTheme} keyName="+" name="+" callback = {() =>{setInput(editSign(input,"+"))}}/>
      <Button darkTheme = {!darkTheme} keyName="4" name="4" callback = {() =>{setInput(input+"4")}}/>
      <Button darkTheme = {!darkTheme} keyName="5" name="5" callback = {() =>{setInput(input+"5")}}/>
      <Button darkTheme = {!darkTheme} keyName="6" name="6" callback = {() =>{setInput(input+"6")}}/>
      <Button darkTheme = {!darkTheme} keyName="-" name="-" callback = {() =>{setInput(editSign(input,"-"))}}/>
      <Button darkTheme = {!darkTheme} keyName="7" name="7" callback = {() =>{setInput(input+"7")}}/>
      <Button darkTheme = {!darkTheme} keyName="8" name="8" callback = {() =>{setInput(input+"8")}}/>
      <Button darkTheme = {!darkTheme} keyName="9" name="9" callback = {() =>{setInput(input+"9")}}/>
      <Button darkTheme = {!darkTheme} keyName="*" name="*" callback = {() =>{setInput(editSign(input,"*"))}}/>
      <Button darkTheme = {!darkTheme} keyName="." name="." callback = {() =>{setInput(editSign(input,"."))}}/>
      <Button darkTheme = {!darkTheme} keyName="0" name="0" callback = {() =>{setInput(input+"0")}}/>
      <Button darkTheme = {!darkTheme} keyName="Backspace" name="&larr;" callback = {() =>{setInput(input.slice(0,input.length-1))}}/>
      <Button darkTheme = {!darkTheme} keyName="/" name="/" callback = {() =>{setInput(editSign(input,"/"))}}/>
      <Button darkTheme = {!darkTheme} keyName="c" name="C" callback = {() =>{setInput("")}}/>
      <Button darkTheme = {!darkTheme} keyName="Enter" name="=" callback = {() =>{calc(input,history,setHistory,setResult);}}/>
    
    </div>)
}
function calc(expression:string,
  history:string,
  setHistory:React.Dispatch<React.SetStateAction<string>>,
  setResult:React.Dispatch<React.SetStateAction<number>>):void{
  try{
    var res:number =Function("return "+expression)();
    res = +res;
    if(expression!='' &&
      !history.split("\n").includes(expression))
      setHistory(history+expression+"\n")
      if(res==Infinity || res ==-Infinity)
        {alert("деление на ноль!")}
      else if(!Number.isNaN(res))
        {setResult(res);}
    return;
  }
  catch{
    alert("ошибка ")
    return;
  }
}
function editSign(input:string, sign:String):string{
  let c:string =input.charAt(input.length-1);
  if ( (Number.isNaN(+c)) || c == ""){
    if(c =="" && sign =="-")
      return (input+sign);
    if(c == sign || (c =="" )){
      return (input);
    }
    else{
      return input.slice(0,input.length-1)+sign;
    }
  }
  return (input+sign);
}

function Button(
  {keyName,
  darkTheme = true,
  name,
  callback,
  }:
  {keyName:string,
  darkTheme:boolean,
  name:string,
  callback:()=>void,
  })
{
  const[keyNamemem, setkeyName] = useState(keyName);
  //console.log("button"+keyNamemem+" generated!")
  return(
  <button data-darktheme={darkTheme}id={""+keyNamemem} onClick={callback}>
    {name}
 </button> )
}