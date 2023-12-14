import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [possibleCombinations, setPossibleCombinations] = useState(0);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let nums = "0123456789";
    let chars = "!@~#$%^&*(){}[]:;<>,?/";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += nums;
    if (charAllowed) string += chars;
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setPassword(pass);
    setPossibleCombinations(Math.pow(string.length, length));   // Using Combination & Repition Principle [n^r]
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy password to clipboard: ", err);
      });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 p-9">
        <h2 className="text-white text-center">Password Generator</h2>

        <div className="flex p-7">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard} // Attach onClick to the button
          >
            Copy
          </button>
        </div>
        <div className="text-white text-center" style={{ fontSize: "smaller" }}>
            {possibleCombinations} Other combinations available!
            <div style={{ paddingBottom: "1rem" }}></div>
        </div>
        <div className="flex text-sm gap-x-2 justify-center">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;