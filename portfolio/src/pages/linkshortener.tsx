import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from 'react';

const shortenUrl = process.env.NEXT_PUBLIC_MODE === 'prod' ? '/api/shorten' : 'http://localhost:8082/shorten';
const shotenedUrlCOuntUrl = process.env.NEXT_PUBLIC_MODE === 'prod' ? '/api/shortenedUrlsCount' : 'http://localhost:8082/shortenedUrlsCount';

const isValidURL = (str: string) => {
  return str.length > 4000 ? false : true;
};

const shortenURL = async (url: string) => {
  try {
    const response = await fetch(shortenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error shortening the URL:", error);
    throw error;
  }
};

const getAllUrlsCount = async () => {
  try {
    const response = await fetch(shotenedUrlCOuntUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error shortening the URL:", error);
    throw error;
  }
};

export default function Home() {
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isCopied, setisCopied] = useState(false);
  const [allUrlsCount, setAllUrlsCount] = useState(0);
  const [limitError, setLimitError] = useState('');
  const [serverError, setServerError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onShortenedUrlClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setisCopied(true);
  };


  useEffect(() => {
    const fetchUrlsCount = async () => {
      const allUrlsCountResponse = await getAllUrlsCount();
      setAllUrlsCount(allUrlsCountResponse.count || 0);
    };
    fetchUrlsCount();
  }, []);
  

  useEffect(() => {
    if (isCopied) {
      const timeoutId = window.setTimeout(() => {
        setisCopied(false);
      }, 2500);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [isCopied]);

  // remove errors if input changes
  useEffect(() => {
      setLimitError('');
      setServerError('')
  }, [inputValue])

  const handleSubmit = async () => {

    if (!isValidURL(inputValue)) {
      setLimitError('URL length must be less than 4000 symbols');
      return;
    }

    setSubmittedUrl(inputValue)

    try {
      const data = await shortenURL(inputValue);

      if (data && data.shortenedUrl) {
        setShortenedUrl(data.shortenedUrl);
      } else {
        console.error("Unexpected data format from server:", data);
      }
    } catch (error) {
      console.error("Error shortening the URL:", error);
      setServerError('Error shortening the URL');
    }
  };

  return (
    <>
      <Head>
        <title>Link Shortener</title>
        <meta name="description" content="Link Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=Noto+Sans:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>

        <div className={styles.middleBlock}>
          <div className={`${styles.middleTopBlock} ${styles.movingGradientBackground}`}></div>

          <span>Help your customers find your web page quickly. With a short link, customers won't have to see long URL addresses that take up a lot of space.</span>

          <span>Shortend URLs by users: {allUrlsCount}</span>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputField}
                placeholder="Paste URL for shortening"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <button
              className={`${styles.submitButton} ${styles.movingGradientBackground}`}
              disabled={!inputValue || inputValue === submittedUrl || !!limitError}
              onClick={handleSubmit}
            >
              <span title="Shorten" className={styles.buttonText}>Shorten</span>
            </button>
          </div>

          {serverError ? <div className={styles.errorText}>{serverError}</div> : null}
          {limitError ? <div className={styles.errorText}>{limitError}</div> : null}

          {shortenedUrl ?
            <div className={styles.shortenedUrlContainer}>
              <p>Your shortened url:</p>
              <span
                onClick={onShortenedUrlClick}
                className={styles.shortenedUrl}
              >
                {shortenedUrl}
              </span>
              {isCopied ? <p>Copied!</p> : null}
            </div>
            : null
          }
        </div>
      </main>
    </>
  )
}
