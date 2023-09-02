import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ochir Budzhalov</title>
        <meta name="description" content="Ochir Budzhalov" />
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
            <h1 className={styles.myName}>Ochir Budzhalov</h1>
            <h4>Front End Software Engineer</h4>
            <p className={styles.infoAboutMe}>Specializing in React and TypeScript, I'm committed to crafting seamless web applications that users love. With a passion for web development, I constantly explore new techniques and methodologies to deliver innovative solutions. My goal is to collaborate on projects that drive growth and foster continuous learning.</p>

            <div className={styles.connectWithMe}>
              <p><a href="https://linkedin.com/in/kisaragi99/" target="_blank" rel="noopener noreferrer">Connect with me on LinkedIn</a></p>
              <p><a href="https://ochirengineer.ru/resume" target="_blank" rel="noopener noreferrer">My Resume</a></p>
              <p><a href="/linkshortener" target="_blank" rel="noopener noreferrer">Link Shortener</a></p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
