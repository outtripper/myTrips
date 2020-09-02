import React, { useEffect, useState } from 'react' 
import {getActiveTrips} from '../services/business'
import Loading from '../components/Loading'
import {Card} from 'antd'

const {Meta} = Card

export default ()=> {
  const [listActiveTrips,setListActiveTrips] = useState<Array<MyTrip>>(null)

  useEffect( () => {
    (async ()=>{
      setListActiveTrips(await getActiveTrips())
    })()
  },[])


  if (!listActiveTrips)
    return <Loading />

  return (<div>
    <header className="p-4">
      <div className="text-2xl font-semibold">My Trips</div>
    </header>

    <section>
      <div>Next Trips</div>
      {listActiveTrips.map( t => <div key={t.id}>
      <Card
      className="rounded shadow"
      hoverable
      style={{ width: 240 }}
      cover={<img alt="photo" src={t.program.photoGallery[0]} />}
    >
      <Meta title={t.destination.description} description={t.program.description} />
    </Card>,
    </div>)}
    </section>

    <section>
      <div>Previous Trips</div>
    </section>
  </div>)
}