import React from 'react'

function DisplayConnectionTable({name,company,year,branch}){
  return (
        <tr>
            <th>{name}</th>
            <th>{company}</th>
            <th>{year}</th>
            <th>{branch}</th>
        </tr>
  )
}

export default DisplayConnectionTable;