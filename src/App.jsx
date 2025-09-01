import { useState } from 'react'
import './App.css'
import main from '../public/main image.jpg'
import normal from '../public/normalweight.jpg'
import over from '../public/overweight.jpg'
import under from '../public/underweight.jpg'
import obese from '../public/obese.jpg'

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStaus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateBmi =() =>{
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight =/^\d+$/.test(weight);

    if(height && weight){
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if(bmiValue < 18.5){
        setBmiStaus('Underweight');
      } else if(bmiValue >= 18.5 && bmiValue < 24.9){
        setBmiStaus('NormalWeight');
      } else if(bmiValue >= 25 && bmiValue < 29.9){
        setBmiStaus('Overweight');
      } else{
        setBmiStaus('obese')
      }
      setErrorMessage('');
    } else{
      setBmi(null);
      setBmiStaus('');
      setErrorMessage('Please Enter valid numeric values for Height and Weight.')
    }
  }
 
  const clearAll=() =>{
    setHeight('');
    setWeight('');
    setBmi('');
    setBmiStaus('');
  };

  const getImage=() =>{
    if(bmiStatus === 'Underweight') return under;
    if(bmiStatus === 'Overweight') return over;
    if(bmiStatus === 'NormalWeight') return normal;
    if(bmiStatus === 'obese') return obese;
    return main ; 
  }


  return (
    <>
      <div className='flex w-200 h-150 bg-white rounded-2xl bmi-calculator '>
       <div className='w-100 '>
        <img src={getImage()} alt='Status' className='w-300 h-140'/>
       </div>
       <div className='flex-1'>
        <p className='text-3xl mb-10 p-5 uppercase text-gray-900'>BMI Calculator</p>

        {errorMessage && <p className='text-red-500 text-sm mb-10'>{errorMessage}</p>}
        <div className='mb-5'>
          <label htmlFor='Height' className='block mb-5 text-gray-800'>Height (cm):</label>
          <input type='text' value={height} className='border-1 border-gray-500 text-md rounded-xl' id='Height' onChange={(e)=> setHeight(e.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor='Weight' className='block mb-5 text-gray-800'>Weight (kg):</label>
          <input type='text' value={weight} className='border-1 border-gray-500 text-md rounded-xl' id='Weight' onChange={(e)=> setWeight(e.target.value)} />
        </div>
        <button className='btn text-md cursor-pointer text-white border-1 rounded-xl bg-blue-500 hover:bg-blue-700' onClick={calculateBmi}>Calculate BMI</button>
        <button className='btn text-md cursor-pointer text-white border-1 rounded-xl ml-10 bg-red-500 hover:bg-red-700' onClick={clearAll}>Clear</button>
        {bmi !== null && (
        <div className='text-center mt-10 p-5 border-1 border-blue-400 rounded-l'>
         <p className='font-bold text-blue-500'>Your BMI is: {bmi}</p>
         <p className='text-gray-600'>Status: {bmiStatus}</p>
        </div>
        )}
       </div>
      </div>
    </>
  )
}

export default App
