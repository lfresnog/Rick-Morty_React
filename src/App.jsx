import React, {useState, useEffect} from 'react';
import './App.css';
import rickIcon from './Assets/rickmorty.png'
//import Test from './Components/Test'
import Characters from './Components/Characters'
import client from './Components/client'
import AppContext from "./Components/AppContext";
import { ApolloProvider } from '@apollo/react-hooks';

function App() {
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);

  const store = {
    chars: {get: characters, set: setCharacters},
    search: {get: search, set: setPages},
    pages: {get: pages, set: setPages}
  };

  useEffect((pages) => {
    if(pages!==1){
      setPages(1);
    }  
  }, [search]);

  return (
    
      <ApolloProvider client={client}>
        <AppContext.Provider value={store}>
        <div className="App">
          <img  className='rickIcon' src={rickIcon} onClick={()=>setCharacters(null)} alt="Error"/>
          <div className='input'>
            <input className='searchInput' onChange={event=>setSearch(event.target.value)} placeholder='Search'/>
          </div>
          <Characters/>
        </div>
        </AppContext.Provider>
      </ApolloProvider>
    
  );
}

export default App;
