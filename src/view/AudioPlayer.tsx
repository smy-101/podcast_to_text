import React, { useRef, useState, useEffect } from "react";
import { AudioControls } from "../components/AudioControls/AudioControls";

type Props = {
	tracks: { title: string; podcastSrc: string }[];
};

const AudioPlayer: React.FC<Props> = (props) => {
	const { tracks } = props;
	const [trackIndex, setTrackIndex] = useState(0); //Podcast索引
	const [trackProgress, setTrackProgress] = useState(0); //Podcast进度
	const [isPlaying, setIsPlaying] = useState(false);

	const { title, podcastSrc } = tracks[trackIndex];

	const audioRef = useRef(new Audio(podcastSrc));
	const intervalRef = useRef<any>();
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

	const onScrub = (value: number) => {
		// Clear any timers already running
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

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

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

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

	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<>
			<AudioControls isPlaying={isPlaying} onNextClick={toNextTrack} onPlayPauseClick={() => setIsPlaying(!isPlaying)} onPrevClick={toPrevTrack} />
		</>
	);
};

export { AudioPlayer };
