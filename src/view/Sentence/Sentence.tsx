import {useEffect, useState} from 'react';
import {getVtt} from '@/helpers/getVtt';
import './Sentence.scss';

const Sentence = () => {
  const [vtt,setVtt] = useState<Vtt[]>([]);

  const getData = (data:any) => {
    setVtt(data.cues);
  }

  useEffect(()=>{
    getVtt(getData);
  },[])

  return <>
    <div style={{}} className='container'>
      {vtt.map((i,index)=>{
        return <div key={index} style={{margin:'30px 4px',textAlign:'center'}}>
          <div>{i.text}</div>
        </div>
      })}
    </div>
  </>
};

export {Sentence};