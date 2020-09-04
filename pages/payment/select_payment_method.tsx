import React from 'react'
import {useRouter} from 'next/router'
import {Button} from 'antd'


export default () => {
  const router = useRouter()

  return (<div>
    <header>Select payment methods</header>
    <section>
      <Button onClick={()=>router.push('/payment/pay_with_credit_card')}  type="primary">One Payment</Button>
      <Button onClick={()=>router.push('/payment/installments')} type="primary">Installments</Button>
    </section>
  </div>)
}