import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Planet from './Planet';

const fetchPlanets = async(key, greetings,page)=>{
  console.log(greetings)
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json()
}

const Planets = () => {
  const[page, setPage]= useState(1);
  const variable = 'Hello Voyager'
  const {data, status} = useQuery({queryKey: ['planets',variable, page], queryFn:()=> fetchPlanets(null,variable,page)})
  console.log(data)
  return (
    <div>
        <button onClick={()=>setPage(1)} >Page 1</button>
        <button onClick={()=>setPage(2)} >Page 2</button>
        <button onClick={()=>setPage(3)} >Page 3</button>
        <h2>Planets</h2>
        { status === 'error' && (
          <div>Error Fetching the data</div>
        )}
        {status === 'loading' && (
          <div>Loading data...</div>
        )}
        {status === 'success' && (
          <div>{data.results.map(planet => <Planet key={planet.name} planet={planet} /> )}</div>
        )

        }
    </div>
  )
}

export default Planets