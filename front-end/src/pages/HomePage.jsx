import React, { useState } from 'react';
import SearchFilters from '../components/homepage/SearchFilters'
import SearchManual from '../components/homepage/SearchManual'
import { Header } from '../components';
import { Button } from '../components/Elements';

export default function HomePage() {
  const [typeSearch, setTypeSearch] = useState('');

  return(
    <div>
      <Header />
      <div
        className='type-search'
      >
        { typeSearch === '' && (
          <section
            id='type-search-section'
          >
            <Button 
              buttonName="MANUAL"
              id="type-search-btn"
              onClick={ () => setTypeSearch('manual') }
              type="button"
            />
            <Button 
              buttonName="FILTERS"
              id="type-search-btn"
              onClick={ () => setTypeSearch('filter') }
              type="button"
            />
          </section>
        ) }
        { typeSearch !== '' && (
          <Button 
            buttonName="ALTERAR FILTRAGEM"
            id="change-filter-type"
            onClick={ () => setTypeSearch('')}
            type="button"
          />
        ) }
      </div>
        { typeSearch === 'manual' ? <SearchManual /> : typeSearch === 'filter' && <SearchFilters /> }
    </div>
  )
}