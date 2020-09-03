import React, { useEffect, useState } from 'react'
import { Carousel, Image, Badge, Divider, Collapse, Button } from 'antd'
import { getMyTrip } from '../services/business'
import Loading from '../components/Loading'
import ActionSelector, { ACTION } from '../components/ActionSelector'
import {MailOutlined, PhoneOutlined, CloseOutlined, MessageOutlined,CreditCardOutlined} from '@ant-design/icons'
import moment from 'moment'
import {useRouter} from 'next/router'
import numeral from 'numeral'

export default () => {
  const [myTrip, setMyTrip] = useState<MyTrip>(null)
  const [actionSelected, setActionSelected] = useState(ACTION.PAYMENTS)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      setMyTrip(await getMyTrip())
    })()
  }, [])

  const BodyTripInfo = () => {
    return (<div>
      {myTrip.program.programInfo.map(pi => (<div key={`pi${pi.id}`}>
        <section className="p-4 bg-black">
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
    const purchaseAmount : number = myTrip.invoice.items.map(i => i.amount).reduce((acc,curr)=> acc+=curr)
    const paymentsAmount : number = myTrip.invoice.payments.length > 0 ?  myTrip.invoice.payments.map(p => p.amount).reduce((acc,curr)=> acc+=curr) : 0
    const { Panel } = Collapse
    return (<div>
      <div className="flex font-thin justify-between px-4">
        <div>
          <div>From</div>
          <div>{moment(myTrip.dates.from).format('MMM d, YYYY')}</div>
        </div>
        <div>
          <div>To</div>
          <div>{moment(myTrip.dates.from).format('MMM d, YYYY')}</div>
        </div>
        <div>
          <div>Guest</div>
          <div>3</div>
        </div>
      </div>
      <Divider className="bg-gray-600" />
      <div className="px-4 font-thin">
        {myTrip.invoice.items.map(item => (<div key={item.id} className="flex justify-between py-2">
          <div>{item.description}</div>
          <div>{numeral(item.amount).format('$0,0.00')}</div>
        </div>))}
        <Divider className="bg-gray-600" />
        <div className="flex justify-between font-base font-semibold">
          <div>Your reservation amount</div>
          <div>{numeral(myTrip.invoice.items.map( i => i.amount).reduce((acc,curr) => acc+= curr)).format('$0,0.00')}</div>
        </div>
        <Divider className="bg-gray-600" />
        <div className="flex justify-between font-base font-semibold">
          <div>Your payments</div>
          <div>{numeral(paymentsAmount).format('$0,0.00')}</div>
        </div>
        <Divider className="bg-gray-600" />
        <div className="flex justify-between font-base font-semibold">
          <div>Your Balance</div>
          <div className={paymentsAmount - purchaseAmount < 0 ? 'text-red-500' : 'text-white' }>{numeral(paymentsAmount - purchaseAmount).format('$0,0.00')}</div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-8 pb-8 bg-black">
        <Button type="primary" shape="round" icon={<CreditCardOutlined />} >Make a payment</Button>
      </div>
    </div>)
  }

  const BodyQuestionarie = () => {
    return (<div>Questionarie</div>)
  }

  const BodyContactInfo = () => {
    return (<div>
      <div className="px-4 text-2xl font-semibold">Do you have any inquiry?</div>
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
    <div className="h-64 relative">
      <Image src={myTrip.program.photoGallery[0]}/>
      <div className="absolute inset-x-0 top-0 h-64bg-gray-900 bg-opacity-25">
        <div className="h-32 flex justify-between p-4 pt-6">
          <div onClick={() =>router.push('/home')}><CloseOutlined style={{fontSize:"24px"}} /></div>
          <div>
            <Badge count={5}>
              <MessageOutlined style={{fontSize:"24px"}} />
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="text-3xl font-semibold">{myTrip.destination.description}</div>
          <div className="font-thin">{myTrip.program.description}</div>
          <div className="flex items-center font-thin">
            <div className="bg-teal-700 h-2 w-2 rounded-full mr-2"></div>
            <div>{`From ${moment(myTrip.dates.from).format('MMM d, YYYY')} till ${moment(myTrip.dates.to).format('MMM d, YYYY')}`}</div>
          </div>
        </div>
      </div>
    </div>
    <ActionSelector actionSelected={actionSelected} updateFuncion={setActionSelected} />
    <Divider className="bg-gray-600" />
    {renderBody()}
  </div>)
}