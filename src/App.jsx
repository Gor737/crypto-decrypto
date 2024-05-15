import React, { useState } from 'react'
import './App.css';
import CryptoJS from 'crypto-js'
//import Dropdown from 'react-dropdown';
//import { TiArrowDownOutline } from "react-icons/ti";

const SECRET_PASS = 'XkhZG4fW2t2W'


const App = () =>{

  const [text, setText] = useState('')
  const [screen, setScreen] = useState('encrypt')
  const [errorMessage, setErrorMessage] = useState('')
  const [encryptedData, setEncryptedData] = useState('')
  const [decryptedData,setDecryptedData] = useState('')
  const [hashType, setHashType] = useState('')

  const switchScreen = (type) =>{
    setScreen(type)

    setText('')
    setEncryptedData('')
    setDecryptedData('')
    setErrorMessage('')
  }

  const encryptData = () =>{
    try{
      // const data = CryptoJS(hashType).encrypt(
        const data = CryptoJS[hashType].encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString()
      setEncryptedData(data)
      setErrorMessage('')
    } catch(error){
      setErrorMessage('Encryption failed. Please check your input')
    }
  }

  const decryptData = () =>{
    try{
      //const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS)
      const bytes = CryptoJS[hashType].decrypt(text,SECRET_PASS)
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      setDecryptedData(data)
      setErrorMessage('')
    }catch(error) {
      setErrorMessage('Decryption failed. Please check your input')
    }
  }

  const handleClick = () =>{
    if(!text){
      setErrorMessage('Please enter a valid text')
      return
    }

      if(screen === 'encrypt'){
        encryptData()
      } else{
        decryptData()
      }
  }

  const hashTypeFunction = (e) =>{
    setHashType(e.target.value)
  }

  const options = [
    'AES', 'Blowfish', 'DES', 'MD5', 'Rabbit'
  ];
  const defaultOption = options[0];
  
  return(
  <body>
    <div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
    
    
    
    <div className='container'>
      

     <select onChange={hashTypeFunction} className='dropDown'>
        <option value="AES">AES</option>
        <option value="Blowfish">Blowfish</option>
        <option value="DES">DES</option>
        <option value="MD5">MD5</option>
        <option value="Rabbit">Rabbit</option>
      </select>

    <div className='buttons'>
        <button
          className={`btn btn-left ${screen === 'encrypt' ? 'active' : ''}`}
          onClick={() =>{switchScreen('encrypt')}}
          >
          Encrypt
        </button>
        <button
          className={`btn btn-right ${screen === 'decrypt' ? 'active' : ''}`} 
          onClick={() =>{switchScreen('decrypt')}}
          >
            Decrypt
        </button>
    </div>

      <div className='card'>
        <textarea
          value={text}
          onChange={({target}) => setText(target.value)}
          placeholder={screen === 'encrypt' ? 'Enter Your Text' : 'Enter Encrypted date'}
          />

        {errorMessage && <div className='error'>{errorMessage}</div>}

        <button 
          className={`btn submit-btn ${screen === 'encrypt' ? 'encrypt-btn' : 'decrypt-btn'}`}
          onClick={handleClick}
          >
          {screen === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </div>

      {encryptedData || decryptedData ? ( 
        <div className='content'>
            <label>{screen === 'encrypt' ? 'ENCRYPTED' : 'Decrypted'} DATA</label>
            <p>{screen === 'encrypt' ? encryptedData : decryptedData}</p>
          </div>
      ) : null}
    
    </div>
      </body>
  )
}

export default App




// function App() {
  //   return (
    //     <div className="App">
    //       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
