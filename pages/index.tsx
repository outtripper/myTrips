import React from 'react' 
import {Button} from 'antd'
import {useRouter} from 'next/router' 

export default () => {
  const router = useRouter()

  return (<div className="text-red-400">
      <Button onClick={() => router.push('/home')} type="primary">Primary Button</Button>
    </div>)
}