import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Character, GetCharackterResults } from '../types'
import imageLoader from '../imageLoader'
import Link from 'next/link'
const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div>
          {characters.map((c) => {
            return <div key={c.id}>
              <Link href={`/characters/${c.id}`}>
                <a>
                  <h3>{c.name}</h3>
                </a>
              </Link>
              <Image
                loader={imageLoader}
                unoptimized
                src={c.image}
                alt={c.name}
                width={200}
                height={200}
              />
            </div>
          })}
        </div>
      </body>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const { results }: GetCharackterResults = await res.json();

  return {
    props: {
      characters: results,
    }
  }
}
export default Home
