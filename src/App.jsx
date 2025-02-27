import { useCallback, useEffect, useState } from "react"

function App(){

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

const passwordGenerate = useCallback(() => {
  let pass = ''
  
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) str+= "1234567890"
  if(char) str+= "~!@#$%^&*+?`{}()"
  
  for (let i = 0; i <= length; i++) {
    let characterIndex = Math.floor(Math.random() * str.length)
    pass += str.charAt(characterIndex) // += dds the value on the right-hand side to the value on the left-hand side and assigns the result back to the left-hand side variable.
  }
  setPassword(pass) 
 



}, [length, number, char, setPassword])

useEffect(() => {
  passwordGenerate()
}, [length, char, number, passwordGenerate])


return ( 
  <>
    <div className="max-w-md w-full p-4 mx-auto shadow-md my-8 text-orange-500 rounded-lg bg-gray-800 ">
      <div className="flex justify-center">
      <h1 className="text-3xl font-semibold mt-2 mb-8 text-orange-500">Password Generator</h1>
      </div>
      <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
        <input type="text"
          value={password}
          readOnly
          className="outline-none w-full py-1 px-3"
          />
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-orange-400 shrink-0 font-bold text-lg">Copy</button>
      </div>

      <div className="flex gap text-sm-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={8}
          max={100}
          value={length}
          className="cursor-pointer bg-blue-500"
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className="font-semibold">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked = {number}
          id="numberInput"
          className="cursor-pointer ml-4"
          onChange={() => {setNumber(prev => !prev)}}
          />
          <label className="font-semibold">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked = {char}
          id="numberInput"
          className="cursor-pointer ml-4"
          onChange={() => {setChar(prevChar => !prevChar)}}
          />
          <label className="font-semibold">Character</label>
        </div>
      </div>
    </div>
  </>
)

}

export default App