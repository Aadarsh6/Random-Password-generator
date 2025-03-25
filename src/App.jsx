import { useCallback, useEffect, useRef, useState } from "react"

function App(){

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef()

const passwordGenerate = useCallback(() => {
  let pass = ""
  
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) str+= "1234567890"  //x += y;  // Same as: x = x + y;

/*let num = 10;
num += 5;  // Same as: num = num + 5;
console.log(num); // Output: 15
 */

  if(char) str+= "~!@#$%^&*+?`{}()"
  
  for (let i = 0; i < length; i++) {
    let characterIndex = Math.floor(Math.random() * str.length)
    pass += str.charAt(characterIndex) // += adds the value on the right-hand side to the value on the left-hand side and assigns the result back to the left-hand side variable.
  }



    // Ensure at least one number if the number checkbox is checked

     if (number && !/\d/.test(pass)) {                               //console.log(/\d/.test("Hello123")); // ✅ true (contains digits)
      let randomIndex = Math.floor(Math.random() * number.length)   //console.log(/\d/.test("NoNumbers")); // ❌ false (no digits)
                                                                    //console.log(/\d/.test("Passw0rd")); // ✅ true (contains '0')
      pass =  
              pass.substring(0, randomIndex) 
        + 
       
        + 
        pass.substring(randomIndex + 1);
    
    }
                                                                
     //  Ensure at least one special character if the character checkbox is checked

  if (char && !/[~!@#$%^&*+?`{}()]/.test(pass)) {
    let randomIndex = Math.floor(Math.random() * pass.length);
    pass =
      pass.substring(0, randomIndex) 
      +
      char[Math.floor(Math.random() * char.length)] 
      +
      pass.substring(randomIndex + 1);
  }


  setPassword(pass) 
 



}, [length, number, char])

useEffect(() => {
  passwordGenerate()
}, [length, char, number, passwordGenerate])

const copyPasswordToClipboard = useCallback(() => {
  if(passwordRef.current){

    const input = passwordRef.current;
  input.select();
  window.navigator.clipboard.writeText(password).then(()=>{

/** 
    In this case, you don’t need to clear the setTimeout because:
    setTimeout runs once and clears itself automatically.
    Unlike setInterval, which runs repeatedly, setTimeout executes once and is removed from memory.
*/

    setTimeout(() => {
      input.setSelectionRange(0, 0);
      input.blur()
    }, 300);
  }).catch(e => console.error("Failed to copy", e));
}
}, [password])



return ( 
<div className="w-full h-screen bg-[#0f172a] flex items-center justify-center">
  <div className="max-w-md w-full p-6 mx-auto shadow-md my-8 text-[#e2e8f0] rounded-lg bg-[#1e293b]">
    <h1 className="text-3xl font-semibold text-center mb-6 text-[#38bdf8]">🔐 Password Generator</h1>

    {/* Password Display Box */}
    <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        value={password}
        readOnly
        className="outline-none w-full py-2 px-3 bg-[#334155] text-[#e2e8f0] rounded-l-md"
        ref={passwordRef}
      />
      <button
        onClick={copyPasswordToClipboard}
        className="bg-[#38bdf8] hover:bg-[#0ea5e9] px-4 py-2 text-[#0f172a] font-bold rounded-r-md"
      >
        Copy
      </button>
    </div>

    {/* Controls */}
    <div className="flex flex-col gap-3">
      {/* Length Slider */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold">Length: {length}</label>
        <input
          type="range"
          min={8}
          max={20}
          value={length}
          className="cursor-pointer accent-[#38bdf8]"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      {/* Number Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={number}
          onChange={() => setNumber((prev) => !prev)}
          className="cursor-pointer accent-[#38bdf8]"
          id="Num"
        />
        <label htmlFor="Num" className="text-lg font-semibold">Include Numbers</label>
      </div>

      {/*
      Avoid onClick ❌ → Fires before state updates, can cause inconsistencies (Fire as soon as it is clcked and does not wait for the state to update).
      Use onChange ✅ → Fires after the state update, works reliably (Fires only when the state changes).
      */}

      {/* Special Characters Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={char}
          onChange={() => setChar((prev) => !prev)}
          className="cursor-pointer accent-[#38bdf8]"
          id="char"
        />
        <label htmlFor="char" className="text-lg font-semibold">Include Special Characters</label>
      </div>
    </div>
  </div>
</div>
)

}

export default App




// <div className="w-full h-screen flex items-center justify-center bg-black">
// <div className="max-w-md w-full p-4 mx-auto shadow-md my-8 text-orange-500 rounded-lg bg-gray-800 ">
//   <div className="flex justify-center">
//   <h1 className="text-3xl font-semibold mt-2 mb-8 text-orange-500">Password Generator</h1>
//   </div>
//   <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
//     <input type="text"
//       value={password}
//       readOnly={true}
//       className="outline-none w-full py-1 px-3"
//       ref={passwordRef}
//       />
//       <button
//       onClick={copyPasswordToClipboard}  
//       className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-orange-400 shrink-0 font-bold text-lg">Copy</button>
//   </div>

//   <div className="flex gap text-sm-x-2">
//     <div className="flex items-center gap-x-1">
//       <input type="range" 
//       min={8}
//       max={100}
//       value={length}
//       className="cursor-pointer bg-blue-500"
//       onChange={(e) => {setLength(Number(e.target.value))}}
//       />
//       <label className="font-semibold">Length: {length}</label>
//     </div>

//     <div className="flex items-center gap-x-1">
//       <input type="checkbox" 
//       defaultChecked = {number}
//       id="numberInput"
//       className="cursor-pointer ml-4"
//       onChange={() => {setNumber(prev => !prev)}}
//       />
//       <label htmlFor="numberInput" className="font-semibold">Number</label>
//     </div>

//     <div className="flex items-center gap-x-1">
//       <input type="checkbox" 
//       defaultChecked = {char}
//       id="charInput"
//       className="cursor-pointer ml-4"

// 
//       Avoid onClick ❌ → Fires before state updates, can cause inconsistencies (Fire as soon as it is clcked and does not wait for the state to update).
//       Use onChange ✅ → Fires after the state update, works reliably (Fires only when the state changes).
// 

//       onChange={() => {setChar(prevChar => !prevChar)}}
//       />
//       <label htmlFor="charInput" className="font-semibold">Character</label>
//     </div>
//   </div>
// </div>
// </div>