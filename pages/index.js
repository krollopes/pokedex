import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Title = styled.h2`
  color: tomato;
  text-align: center;
`;

const ListOne = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;

  li {
    margin: 20px;
    padding: 10px;
    border: 2px solid #000;
    cursor: pointer;
  }

  a {
    text-decoration:none;
    color: #000;
  }
`;

const ListTwo = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  li {
    margin: 20px;
    padding: 10px;
    border: 2px solid #000;
    cursor: pointer;
    text-align: center;
  }

  a {
    text-decoration:none;
    color: #000;
  }
`;

export async function getStaticProps() {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
    .then((respostaDoServer) => {
      if(respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('erro');
    })
    .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

  return {
    props: {
      pokemons,
    },
  }
}

export default function Home(props) {
  const { pokemons } = props;

  return (
    <div>
      <Title>Pokédex</Title>
      <ListOne>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/sobre">
            <a>Sobre o Projeto</a>
          </Link>
        </li>
      </ListOne>

      <ListTwo>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>
                {pokemon.pokemon_species.name}
              </a>
            </Link>
          </li>
        ))}
      </ListTwo>
    </div>
  );
}