import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="404 Not Found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=Noto+Sans:wght@100;200;300;400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>

        <div className={styles.middleBlock}>
          <div className={`${styles.middleTopBlock} ${styles.movingGradientBackground}`}></div>

          <div className={`${styles.aboutMeContainer} ${styles.movingGradientBackground}`}>
            <h1>404 Page not found.</h1>
          </div>
        </div>
      </main>
    </>
  )
}