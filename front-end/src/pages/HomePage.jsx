import React, { useContext } from 'react';
import { SearchFilters, SearchManual, InitialPage } from '../components/homepage'
import { Header, Footer } from '../components';
import { AuthContext } from '../providers/auth';
import { Button } from '../components/Elements';

export default function HomePage() {
  const { typeSearch, setTypeSearch } = useContext(AuthContext)

  return(
    <div>
      <Header />
      <div
        className='type-search'
      >
        { typeSearch === '' && < InitialPage /> }
      </div>
      { typeSearch !== '' && (
          <Button 
            buttonName="ALTERAR FILTRAGEM"
            id="change-filter-type"
            onClick={ () => setTypeSearch('')}
            type="button"
          />
        ) }
        { typeSearch === 'manual' ? <SearchManual /> : typeSearch === 'filter' && <SearchFilters /> }
      <Footer />
    </div>
  )
}