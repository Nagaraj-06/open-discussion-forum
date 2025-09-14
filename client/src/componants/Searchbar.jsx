import React,{useState} from 'react'
import './Searchbar.css'
import { HiSearch } from 'react-icons/hi';

export const Searchbar = (props) => {
  
  const [search,setSearch]=useState('');

  function handleChange(e) {
    const search_value=e.target.value;
    setSearch(search_value);
    props.searchh(search_value);

  }


    return (
    <div className='search'>
      <form onSubmit={(e)=> e.preventDefault()} >
        <input placeholder='Search here' onChange={handleChange} />

        <button className='searchbutton' type='submit'>
            <span className='searchtext'>Search</span>
            <span className='searchicon'><HiSearch/></span>
        </button>
      
      </form>

    </div>
  )
}


