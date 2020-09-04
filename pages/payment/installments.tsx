import React from 'react'
import PageContainer from '../../components/PageContainer'
import {useRouter} from 'next/router'

export default ()=> {
  const router = useRouter()

  return (<PageContainer
    backAction={()=>console.log('Go Back')}
    nextAction={()=>{
      router.push('/payment/success')
    }}
    beforeAction ={()=>console.log('Go Back')}
    cancelAction ={()=>console.log('Go Back')}
    title="Installments">

    Prueba
  </PageContainer>)
}