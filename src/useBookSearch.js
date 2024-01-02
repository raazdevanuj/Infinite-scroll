import axios from "axios"
import { useEffect, useState } from "react"
export const useBookSearch=(query,pageNumber)=>{
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [books,setBooks]=useState([]);
    const [hasMore,setHasMore]=useState(false);
useEffect(()=>{
    setLoading(true)
    setError(false);
    let cancel
axios({
    method:'GET',
    url:'https://openlibrary.org/search.json',
    params:{q:query,page:pageNumber,offset:100},
    cancelToken:new axios.CancelToken(c => cancel =c)
}).then(res=>{
    setBooks(prev=>{
        return [...prev,...res?.data?.docs?.map(b=>b?.title)];
    })
    setHasMore(res.data.docs.length>0)
    setLoading(false)
}).catch(e=>{
    if(axios.isCancel(e))return;
    setError(true)
})
return ()=>cancel();
},[query,pageNumber])
return{loading,error,books,hasMore}
}