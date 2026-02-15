// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Accordion from './components/Accordion'

const App = () => {
  // const [count, setCount] = useState(0)
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const loadFunds = async () => await fetchFunds();
    loadFunds();
  }, [])


  const fetchFunds = async () => {
    try {
      const response = await axios.get('http://localhost:3000/funds');
      console.log('Fetched funds:', response.data);
      setFunds(response.data);
    } catch (error) {
      console.error('Error fetching funds:', error);
    }
  }

  return (
    <>
      <h1>Funds List</h1>
      <Accordion funds={funds} />
    </>
  )
}

export default App
