import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { Character } from '../../types';
import imageLoader from '../../imageLoader';
import { GetServerSideProps, GetStaticPaths } from 'next';

const CharacterPage = ({ character }: { character: Character }) => {
    const router = useRouter();
    return (
        <div>
            <h1>{character.name}</h1>
            <Image
                loader={imageLoader}
                unoptimized
                src={character.image}
                alt={character.name}
                width={200}
                height={200}

            />
            <button type='button' onClick={() => router.push('/')} >Go home</button>
        </div>
    )
}

// export async function getStaticPaths() {
//     const res = await fetch('https://rickandmortyapi.com/api/character');
//     const { results }: GetCharackterResults = await res.json();

//     return {
//         paths: results.map((character) => {
//             return {
//                 params: { id: String(character.id) },

//             }

//         }),
//         fallback: false,
//     }

// }

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`)
    const character = await res.json();

    return {
        props: {
            character,
        }
    }

}

export default CharacterPage