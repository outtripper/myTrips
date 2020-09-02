import React, { useEffect, useState } from 'react' 
import {getActiveTrips} from '../services/business'
import Loading from '../components/Loading'


export default ()=> {
  const [listActiveTrips,setListActiveTrips] = useState(null)

  useEffect( () => {
    (async ()=>{
      setListActiveTrips(getActiveTrips())
    })()
  })


  if (!listActiveTrips)
    return <Loading />

  return (<div>
    <header>
      <div>My Trips</div>
    </header>
  </div>)
}