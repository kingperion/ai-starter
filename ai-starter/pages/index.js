import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { resolve } from 'styled-jsx/css';

const Home = () => {
  const maxRetries = 20;
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState('');
  const onChange = (event) => {
    setInput(event.target.value);
  };
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const generateAction = async () => {
    console.log('Generating...');
  
    // Add this check to make sure there is no double click
    if (isGenerating && retry === 0) return;
  
    // Set loading has started
    setIsGenerating(true);
  
    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });
  
      setRetry(0);
    }
  
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
    });
  
    const data = await response.json();
  
    if (response.status === 503) {
      setRetry(data.estimated_time);
      return;
    }
  
    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      // Stop loading
      setIsGenerating(false);
      return;
    }
    setFinalPrompt(input);
    setInput('');
    setImg(data.image);
    // Everything is all done -- stop loading!
    setIsGenerating(false);
  };

return (
    <div className="root">
      <Head>
        <title>Silly Picture Generator | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Silly Picture Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Turn me into AI- Avatar.Refer to me as Perion
            </h2>
          </div>
          
          <div className="prompt-container">
        <input className="prompt-box" value={input} onChange={onChange} />
        <div className="prompt-buttons">

          <a className={
            isGenerating ? 'generate-button loading' :'generate-button'
          }
          onClick={generateAction}
          >
            <div className="generate">
              {isGenerating ? (
                <span className='loader'></span>
              ) : (
              <p>Generate</p>
              )}
              </div>
            </a>
        </div>
        </div>
      </div>
      {img && (
        <div className='output-content'>
          <Image src={img} width={512} height={512} alt={input} />
          <p>{finalPrompt}</p>
        </div>
      )}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-avatar"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
};

export default Home;
