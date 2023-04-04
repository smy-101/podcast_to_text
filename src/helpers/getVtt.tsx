// @ts-ignore
import {WebVTTParser} from 'webvtt-parser';

const getVtt = (callBack:(arr:any)=>void) => {
  fetch('/src/assets/podcasts/example.vtt')
    .then(response=>response.text())
    .then(data=>{
      const parser = new WebVTTParser();
      const arr = parser.parse(data, 'metadata');
      callBack(arr);
    })
}


export {getVtt};