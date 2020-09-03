import React, { useEffect, useState } from 'react'
import { Carousel, Image } from 'antd'
import { getMyTrip } from '../services/business'
import Loading from '../components/Loading'
import ActionSelector, { ACTION } from '../components/ActionSelector'
import {MailOutlined, PhoneOutlined} from '@ant-design/icons'



export default () => {
  const [myTrip, setMyTrip] = useState<MyTrip>(null)
  const [actionSelected, setActionSelected] = useState(ACTION.CONTACT)

  useEffect(() => {
    (async () => {
      setMyTrip(await getMyTrip())
    })()

  }, [])

  const BodyTripInfo = () => {
    return (<div>
      {myTrip.program.programInfo.map(pi => (<div key={`pi${pi.id}`}>
        <section className="p-4">
          <div className="text-xl font-semibold">{pi.title}</div>
          <div className="font-thin text-justify mt-2">{pi.text}</div>
          <Carousel>
            {pi.photos.map((photoUrl: string, index: number) => (<div key={`${pi.id}-${index}`}>
              <Image src={photoUrl} />
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
    return (<div>
      <div className="p-4 text-2xl font-semibold">Do you have any inquiry?</div>
      {myTrip.program.contactInfo.map((info,index) => (<div key={`contact${index}`} className="flex bg-gray-800 p-4 m-4 rounded-lg">
        <div className="pr-3 flex items-center">{info.kind === 'phone' ? <PhoneOutlined style={{fontSize:'18px'}} /> : <MailOutlined  style={{fontSize:'18px'}}/>}</div>
        <div className="font-thin">{info.text}</div>
      </div>))}
    </div>)
  }

  const renderBody = () => {

    switch (actionSelected) {
      case ACTION.PAYMENTS:
        return <BodyPayments />
      case ACTION.CONTACT:
        return <BodyContactInfo />
      case ACTION.QUESTIONARIE:
        return <BodyQuestionarie />
      default:
        return <BodyTripInfo />
    }
  }

  if (!myTrip)
    return <Loading />

  return (<div className="bg-black h-screen text-white">
    <div className="h-64">
      <Image src={myTrip.program.photoGallery[0]}/>
    </div>
    <ActionSelector actionSelected={actionSelected} updateFuncion={setActionSelected} />
    {renderBody()}
  </div>)
}