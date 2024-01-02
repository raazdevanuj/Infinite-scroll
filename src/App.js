import { useState,useRef,useCallback } from 'react';
import './App.css';
import { useBookSearch } from './useBookSearch';

function App() {
  const [query,setQuery]=useState('');
  const[pageNumber,setPageNumber]=useState(1);
  const{books,hasMore,loading,error}=useBookSearch(query,pageNumber)
  const observer=useRef();
  const lastBookElementRef=useCallback(node=>{
    if(loading)return;
    if(observer.current)observer.current.disconnect();
    observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
       setPageNumber(prev=>prev+1)
      }
    })
  },[loading,hasMore])
  const handleSearch= (e)=>{
    setQuery(e.target.value);
    setPageNumber(1)
  }
  return (
    <div>
      <input type='text' onChange={handleSearch}></input>
     {books?.map((book,index)=>{
      if(books.length==index+1){
        return <div ref={lastBookElementRef} key={book}>{book}</div> 
      }else{
      return <div key={book}>{book}</div>
      }
     })}
      <div>{loading&& 'Loading...'}</div>
      <div>{error&& 'Error'}</div>
    </div>
  );
}

export default App;
