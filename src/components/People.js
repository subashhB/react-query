import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Person from './Person'

const fetchPeople = async() =>{
  const res = await fetch('http://swapi.dev/api/people/')
  return res.json()
}

const People = () => {
  const {data, status} = useQuery({queryKey: ['people'], queryFn: fetchPeople});
  console.log(data)
  return (
    <div>
        <h2>People</h2>
        {status === 'error' &&(
          <div>Error Fetching the Data</div>
        )}
        {status === 'loading' &&(
          <div> Loading Data... </div>
        )}
        {status === 'success' &&(
          <div>{data.results.map(person => <Person key={ person.name } person={ person }/> )}</div>
        )}
    </div>
  )
}

export default People