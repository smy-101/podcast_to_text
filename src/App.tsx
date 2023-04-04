import tracks from '@/assets/podcasts/tracks';
import {AudioPlayer} from '@/view/AudioPlayer/AudioPlayer';
import {Sentence} from '@/view/Sentence/Sentence';

function App() {

  return (
    <div className="App">
      <Sentence/>
      {/*<AudioPlayer tracks={tracks}/>*/}
    </div>
  )
}

export default App
