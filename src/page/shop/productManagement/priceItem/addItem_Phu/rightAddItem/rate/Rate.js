import React, { useEffect, useState } from 'react'
import { Divider, Steps } from 'antd';
import style from './rate.module.css'
import './rate.css'
const { Step } = Steps;

function Rate() {
  const [current, setCurrent] = useState(0);
  
  const windowScroll = (e)=>{
    const basicInfor = document.querySelector('#Basic_infomation')
    const brandElement = document.querySelector('#Brand_Step__allInfor')
    const VarientElement = document.querySelector('#Varient_step__scroll')
    const DescriptionElement = document.querySelector('#Description_step__scroll')
    const TransformElement = document.querySelector('#Transform_Step__scroll')
    if(this.window.scrollY >= 400){
      setCurrent(1)
    }else{
      setCurrent(0)
    }
    if(this.window.scrollY >= 400 + brandElement.offsetHeight){
      setCurrent(2)
    }
    if(this.window.scrollY >= 490 + brandElement.offsetHeight + VarientElement.offsetHeight){
      setCurrent(3)
    }
    if(this.window.scrollY >= 490 + brandElement.offsetHeight + VarientElement.offsetHeight + DescriptionElement.offsetHeight){
      setCurrent(4)
    }
  }
  useEffect(function(){
    window.addEventListener('scroll',windowScroll)
    return ()=>{
      window.removeEventListener('scroll',windowScroll,false)
    }
  },[])
  const onChange = (value) => {
    const basicInfor = document.querySelector('#Basic_infomation')
    const brandElement = document.querySelector('#Brand_Step__allInfor')
    const VarientElement = document.querySelector('#Varient_step__scroll')
    const DescriptionElement = document.querySelector('#Description_step__scroll')
    const TransformElement = document.querySelector('#Transform_Step__scroll')
    // console.log('onChange:', current,value);
    if(value==0){
      basicInfor.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if(value==1){
      brandElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if(value==2){
      VarientElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if(value==3){
      DescriptionElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if(value==4){
      TransformElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
   
    setCurrent(value);
  };
  return (
    <div className={style.rate}>
        <Steps size='small' current={current} onChange={onChange} direction="vertical" className='rate'>
            <Step title="Th??ng tin c?? b???n" description="" />
            <Step title="Th??ng s??? s???n ph???m" description="" />
            <Step title="Gi?? b??n, Kho h??ng v?? Bi???n th???" description="" />
            <Step title="M?? t??? s???n ph???m" description="" />
            <Step title="V??n chuy???n v?? B???o h??nh" description="" />
        </Steps>
    </div>
  )
}

export default Rate