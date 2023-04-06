import React, {useEffect, useState} from 'react';
import {getVtt} from '@/helpers/getVtt';
import './Sentence.scss';

type Props = {
  currentTime:number;
}

const Sentence:React.FC<Props> = (props) => {
  const {currentTime} = props;
  const [vtt,setVtt] = useState<Vtt[]>([]);
  const [currentIndex,setCurrentIndex] = useState(0);

  const getData = (data:any) => {
    setVtt(data.cues);
  }

  useEffect(()=>{
    getVtt(getData);
  },[]);

  const scrollText = (index:number) => {
    const container = document.getElementById('container');
    const distance = (index - currentIndex) * 56;
    container && container.scrollBy({top:distance,behavior:'smooth'})
  }

  const getIndex = () => {
    const index = vtt.findIndex(i=> i.startTime < currentTime && i.endTime > currentTime);
    if (index !== currentIndex){
      scrollText(index);
    }
    setCurrentIndex(index);
  }

  useEffect(()=>{
    getIndex();
    console.log('111111');
  },[currentTime])

  return <>
    <div style={{height:'100vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className='container' id='container'>
        {vtt.map((i,index)=>{
          return <div key={index} style={{margin:'30px 4px',textAlign:'center'}} className={index === currentIndex ? 'selected' : ''}>
            <div>{i.text}</div>
          </div>
        })}
      </div>
    </div>

  </>
};

export {Sentence};