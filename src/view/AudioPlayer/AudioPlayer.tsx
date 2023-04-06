import React, { useRef, useState, useEffect } from "react";
import { AudioControls } from '@/components/AudioControls/AudioControls';
import reactSvg from '@/assets/react.svg';
import './AudioPlayer.scss';
import {Sentence} from '@/view/Sentence/Sentence';

type Props = {
	tracks: { title: string; podcastSrc: string }[];
};

const AudioPlayer: React.FC<Props> = (props) => {
	const { tracks } = props;

	const [trackIndex, setTrackIndex] = useState(0); //Podcast索引
	const [trackProgress, setTrackProgress] = useState(0); //Podcast进度
	const [isPlaying, setIsPlaying] = useState(false);
	const intervalRef = useRef<any>(); //定时器

	const { title, podcastSrc } = tracks[trackIndex];
	const audioRef = useRef(new Audio(podcastSrc));
	const isReady = useRef(false);
	const { duration } = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
	const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, 1000);
	};

	const onScrub = (value: number | string) => {
		// Clear any timers already running
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = Number(value);
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		console.log('触发!');
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
			audioRef.current.play();
		}
		startTimer();
	};

	// const onTrackChange = () => {
	//
	// }

	const toPrevTrack = () => {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1);
		} else {
			setTrackIndex(trackIndex - 1);
		}
	};

	const toNextTrack = () => {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1);
		} else {
			setTrackIndex(0);
		}
	};

	// Handles cleanup and setup when changing tracks
	useEffect(() => {
		audioRef.current.pause();
		audioRef.current = new Audio(podcastSrc);
		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			setIsPlaying(true);
			startTimer();
		} else {
			// Set the isReady ref as true for the next pass
			isReady.current = true;
		}
	}, [trackIndex]);

	const onPlayPauseChange = () => {
		console.log(audioRef.current.duration,'duration');
		if (!isPlaying){
			audioRef.current.play();
			startTimer();
		}else {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		}
		setIsPlaying(!isPlaying);
	}


	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<>
			<div style={{display:'flex'}}>
				<div className='audioPlayer'>
					<div className='trackInfo'>
						<img className='artwork' src={reactSvg} alt=""/>
						<h2 className="title">{title}</h2>
						<h3 className="artist">xxyy</h3>
						<AudioControls isPlaying={isPlaying} onNextClick={toNextTrack} onPlayPauseClick={onPlayPauseChange} onPrevClick={toPrevTrack} />
						<input
							type="range"
							value={trackProgress}
							step="1"
							min="0"
							max={duration ? duration : 100}
							className="progress"
							onChange={(e) => onScrub(e.target.value)}
							onMouseUp={onScrubEnd}
							onKeyUp={onScrubEnd}
							style={{ background: trackStyling }}
						/>
					</div>
				</div>
				<Sentence/>
			</div>


		</>
	);
};

export { AudioPlayer };
