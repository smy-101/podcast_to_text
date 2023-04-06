import tracks from '@/assets/podcasts/tracks';
import {AudioPlayer} from '@/view/AudioPlayer/AudioPlayer';
import './App.scss';

function App() {

  return (
    <div className="App">
      <AudioPlayer tracks={tracks}/>
    </div>
  )
}

export default App
