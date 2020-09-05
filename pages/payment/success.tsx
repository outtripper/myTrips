import React from 'react'
import {Image, Button} from 'antd'
import {useRouter} from 'next/router'

export default () => {
  const router = useRouter()

  return (<div>
    
    <div>
     <Image src='../assets/images/paymentSuccess.svg'/>
    </div>
    <div>
      <Button onClick={()=>router.push('/trip')} type="primary">Go to the Trip</Button>
    </div>
  </div>)
}

