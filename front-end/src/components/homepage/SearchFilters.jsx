import React, { useState, useEffect } from 'react';
import { Button } from '../Elements';
import { getAllGenres } from '../../services/SearchData'
import { SelectOption } from '../Elements';

export default function SearchFilters(props) {
  const [genres, setGenres] = useState({});
  const [filters, setFilters] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  useEffect(()=> {
    const getGenres = async () => {
      const t = await getAllGenres();
      setGenres(t);
    }
    getGenres()
  }, [])

  const selectedFilters = (e) => {
    const { value } = e.target;
    if (!filters.includes(value))
      setFilters((prevState) => [...prevState, value]);
  };

  const removeFilter = (e) => {
    const { target } = e;
    const filter = filters.filter((t) => t !== target.value);
    setFilters(filter);
    setSelectValue('');
  };

  return(
    <div
      className='initial-page'
    >
      <div
        className='search-game'
      >
        { !!genres.genreTypes && (
          <SelectOption
            itens={ genres.genreTypes }
            onChange={ (e) => selectedFilters(e) }
            selectId="genres"
            selectName="genres"
            selectValue={ selectValue }
          />
        )}
        <p>Filtros Adicionados:</p>
        { filters.length > 0 && (
          <div>
            { filters.map((filter) => (
              <p
                key={ filter }
              >
                { filter }
                <Button 
                  buttonName="X"
                  id="remove-game-button"
                  onClick={ (e) => removeFilter(e) }
                  type="button"
                  value={ filter }
                />
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}