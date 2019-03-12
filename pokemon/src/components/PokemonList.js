import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Pokemon from './Pokemon';


import { pokeSelect, pokeCompare, catchPokemon } from '../actions';
import PropTypes from 'prop-types';
import Compare from '../img/compare.png';
import Pokeball from '../img/Pokeball.png';



const PokemonContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`


class PokemonList extends Component {
    componentDidMount() {
      this.props.catchPokemon();
    }
    render() {
  return (
    <>

      <SearchBar />
      {this.props.selected &&
      <Button1 onClick={this.props.pokeCompare}>
        <Compare1 src={Compare} alt="Compare" />
      </Button1>}
      
      <PokemonContainer>
      {this.props.error && <h3>{this.props.error}</h3>}
      {this.props.getting && (

      <Loader
        type='Puff'
        color='#ff1f1f'
        height='400'
        width='400'
      />
      )}

        {this.props.filtered.length !== 0
          ? this.props.filtered.map(poke => (
              <Pokemon key={poke.Name} pokemon={poke} pokeSelect={this.props.pokeSelect} />
            ))
          : this.props.pokemon.map(poke => (
              <Pokemon key={poke.Name} pokemon={poke} pokeSelect={this.props.pokeSelect} />

            ))}
      </PokemonContainer>
    </>
  );
          }
};

const mapStateToProps = state => ({
  error: state.pokemonReducer.error,
  filtered: state.pokemonReducer.filtered,
  getting: state.pokemonReducer.getting,
  pokemon: state.pokemonReducer.pokemon,
  selected: state.pokemonReducer.selected,
});

PokemonList.prototypes = {
  error: PropTypes.string,
  filtered: PropTypes.array,
  getting: PropTypes.boolean,
  pokemon: PropTypes.array,
  selected: PropTypes.boolean
};

const Button1 = styled.button`
  border-radius: 50%;
  width: 250px;
  height: 250px;
  border-style: none;
  background-image: url(${Pokeball});
  background-size: cover;
  background-color: white;
  margin: 10px;
  cursor: pointer;
`;

const Compare1 = styled.img`
  width: 200px;
`;

export default connect(
  mapStateToProps,
  { catchPokemon, pokeSelect, pokeCompare }
)(PokemonList);
