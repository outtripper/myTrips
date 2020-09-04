import React,{useState} from 'react'
import {PageHeader,Button, Space} from 'antd'

interface Props {
  children: any,
  title: string,
  subtitle?: string,
  cancelAction?: Function,
  backAction?: any,
  nextAction?: any,
  beforeAction?: any
}

export default (props: Props ) => {
  const {children, title, subtitle, backAction, cancelAction, beforeAction, nextAction}  = props
  const [bottom, setBottom] = useState(10);
  return (<div>
      <PageHeader 
        title={title}
        subTitle={subtitle}
        onBack={backAction}
      />
    {children}
    <footer className="absolute justify-between inset-x-0 bottom-0 px-6 mb-6">
      <div className="flex bottom-0 inset-x-0 justify-between">
        <div className="w-1/2">{cancelAction ? <Button danger >Cancel</Button> : ' '}</div>
        <div className="flex justify-end w-1/2">
        <Space>
          {beforeAction ? <Button >Next</Button> : ' '}
          {nextAction ? <Button type="primary" onClick={nextAction}>Next</Button> : ''}
        </Space>
        </div>
      </div>
    </footer>
  </div>)
}