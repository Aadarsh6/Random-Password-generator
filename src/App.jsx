import { useCallback, useState } from "react"

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
  
  for (let i = 0; i < length; i++) {
    let characterIndex = Math.floor(Math.random() * str.length)
    pass += str.charAt(characterIndex) // += dds the value on the right-hand side to the value on the left-hand side and assigns the result back to the left-hand side variable.
    setPassword(pass) 
  }

}, [length, number, char, setPassword])


  return <div>
  <div>
    <h1 className="text-4xl font-semibold mt-20 text-white text-center">Password Generator</h1>
  </div>
    <input type="text"  />
  </div>
}

export default App