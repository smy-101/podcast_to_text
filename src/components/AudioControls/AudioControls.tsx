import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Prev } from '../../assets/prev.svg';
import { ReactComponent as Next } from '../../assets/next.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';
import React from 'react';
import './AudioControls.scss';

type Props = {
  isPlaying:boolean;
  onPlayPauseClick:()=>void;
  onPrevClick:()=>void;
  onNextClick:()=>void;
}

const AudioControls:React.FC<Props> = (props) => {
  const {isPlaying,onNextClick,onPlayPauseClick,onPrevClick} = props;

  return (
		<>
			<div className='audioControls'>
				<button onClick={onPrevClick} type="button" aria-label="prev" className='prev'>
					<Prev />
				</button>
        {isPlaying ? <button onClick={onPlayPauseClick} type='button' aria-label='pause' className='pause'>
          <Pause/>
        </button> : <button onClick={onPlayPauseClick} type="button" aria-label="play" className='play'>
					<Play />
				</button>}
				<button onClick={onNextClick} type="button" aria-label="next" className='next'>
					<Next />
				</button>
			</div>
		</>
	);
};

export {AudioControls};