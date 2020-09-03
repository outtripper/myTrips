import React, { useEffect, useState } from 'react'
import {Carousel, Image} from 'antd'
import {getMyTrip} from '../services/business'
import Loading from '../components/Loading'
import ActionSelector,{ACTION} from '../components/ActionSelector'




export default () => {
  const [myTrip,setMyTrip] = useState<MyTrip>(null)
  const [actionSelected, setActionSelected] = useState(ACTION.CONTACT)

  useEffect(() => {
    (async ()=>{
      setMyTrip(await getMyTrip())
    })()

  },[])

  const BodyTripInfo = () => {
    return (<div>
      {myTrip.program.programInfo.map(pi => (<div key={`pi${pi.id}`}>
      <section className="p-4">
        <div className="text-xl font-semibold">{pi.title}</div>
        <div className="font-thin text-justify mt-2">{pi.text}</div>
        <Carousel>
          {pi.photos.map((photoUrl: string,index:number) => (<div key={`${pi.id}-${index}`}>
            <Image src={photoUrl}/>
          </div>))}
        </Carousel>
      </section>
    </div>))}
    </div>)
  }

  const BodyPayments = () => {
    return (<div>Payments Body</div>)
  }

  const BodyQuestionarie = () => {
    return (<div>Questionarie</div>)
  }

  const BodyContactInfo = () => {
    return (<div>Contact Info</div>)
  }

  const renderBody = () => {

    switch(actionSelected){
      case ACTION.PAYMENTS:
        return <BodyPayments />
      case ACTION.CONTACT:
        return <BodyContactInfo/>
      case ACTION.QUESTIONARIE:
        return <BodyQuestionarie/>
      default:
        return <BodyTripInfo />
    }
  }

  if (!myTrip)
    return <Loading/>

  return (<div className="bg-black h-screen text-white">
    <ActionSelector actionSelected={ACTION.CONTACT} updateFuncion={setActionSelected} />
    {renderBody()}
  </div>)
}