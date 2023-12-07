// App.tsx
import './App.css';
import Input from './components/Input';
import Logo from './components/Logo';
import Result from './components/Result';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [generatedText, setGeneratedText] = useState<string[]>([]);

  const fetchData = async (topic: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/generate-text?topic=${encodeURIComponent(topic)}`);
      const questions = response.data.data.split('\n').filter((question: string) => question.trim() !== '');

      if (Array.isArray(questions)) {
        setGeneratedText(questions);
      } else {
        console.error('Invalid data format:', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGenerate = (input: string) => {
    // Handle the generation logic here, if needed
    console.log('Generating questions for input:', input);
    // You can also fetch new questions based on the input, if required
    fetchData(input);
  };

  return (
    <div className='app h-screen flex flex-col justify-center items-center'>
      <Logo />
      <Input onGenerate={handleGenerate} />
      <Result questions={generatedText} />
    </div>
  );
}

export default App;
