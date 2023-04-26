import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Planet from './Planet';

const fetchPlanets = async(page =1)=>{
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json()
}

const Planets = () => {
  const[page, setPage]= useState(1);
  const {data, isPreviousData, isFetching, status} = useQuery({queryKey: ['planets', page], queryFn: ()=> fetchPlanets(page)})
  console.log(data)
  return (
    <div>
        <h2>Planets</h2>
        { status === 'error' && (
          <div>Error Fetching the data</div>
        )}
        {status === 'loading' && (
          <div>Loading data...</div>
        )}
        {status === 'success' && (
          <>
            <button
              onClick={() => setPage(old => Math.max(old - 1 , 1))}
              disabled={page === 1}
            >Previous Page</button>
            { page }
            <button
              onClick={()=>setPage(old => (!isFetching && !isPreviousData && !data.next ? old: old+1 ))}
              disabled={!isFetching && !isPreviousData && !data.next}
            >Next Page</button>
            <div>{data.results.map(planet => <Planet key={planet.name} planet={planet} /> )}</div>
          </>
        )

        }
    </div>
  )
}

export default Planets