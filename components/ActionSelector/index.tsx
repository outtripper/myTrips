import React from 'react'
import {PhoneOutlined, CreditCardOutlined, InfoCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons'

export enum ACTION {
  CONTACT="CONTACT",
  PAYMENTS="PAYMENTS",
  TRIP_INFO="TRIP_INFO",
  QUESTIONARIE="QUESTIONARIE"
}

interface Props {
  actionSelected : ACTION,
  updateFuncion: Function
}

const ICON_SIZE="24px"

export default (props:Props) => {
  const {actionSelected,updateFuncion} = props
  console.log(actionSelected)
  return (<div>
    <div className="flex justify-between px-4">
      <div onClick={() => updateFuncion(ACTION.CONTACT)} className={`text-center ${actionSelected === ACTION.CONTACT ? 'text-teal-500' :''}`}>
        <div className=" flex justify-center p-2"><PhoneOutlined style={{fontSize:ICON_SIZE}} /></div>
        <div>Contact</div>
      </div>
      <div onClick={() => updateFuncion(ACTION.PAYMENTS)}  className={`text-center ${actionSelected === ACTION.PAYMENTS ? 'text-teal-500' :''}`}>
        <div className="flex justify-center p-2"><CreditCardOutlined style={{fontSize: ICON_SIZE}}/></div>
        <div>Payment</div>
      </div>
      <div onClick={() => updateFuncion(ACTION.TRIP_INFO)}  className={`text-center ${actionSelected === ACTION.TRIP_INFO ? 'text-teal-500' :''}`}>
        <div className="flex justify-center p-2"> <InfoCircleOutlined style={{fontSize: ICON_SIZE}} /></div>
        <div>Info</div>
      </div>
      <div onClick={() => updateFuncion(ACTION.QUESTIONARIE)}  className={`text-center ${actionSelected === ACTION.QUESTIONARIE ? 'text-teal-500' :''}`}>
        <div className="flex justify-center p-2"> <QuestionCircleOutlined style={{fontSize: ICON_SIZE}} /></div>
        <div>Questionarie</div>
      </div>
    </div>
  </div>)
}