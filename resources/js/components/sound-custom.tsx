import React, { SyntheticEvent, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { LucidePauseCircle, LucidePlayCircle, LucideStopCircle } from 'lucide-react';

const SoundCustom = () => {

    // Durée du MP3
    const [duration, setDuration] = useState(0);

    const [isPlaying, setPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const audio = useRef<HTMLAudioElement>(null);
    const track = useRef<HTMLInputElement>(null);
    const elapsed = useRef<HTMLSpanElement>(null);
    const trackTime = useRef<HTMLSpanElement>(null);
    const volume = useRef<HTMLInputElement>(null);
    const volumeValue = useRef<HTMLSpanElement>(null);

    function buildDuration(duration: number) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${minutes} : ${formattedSeconds}`;
    }

    function handlePlay() {
        if (audio.current && volume.current) {
            audio.current.play();
            audio.current.volume = Number(volume.current.value);
        }
        setPlaying(true)
        setIsPaused(false);
    }

    function handlePause() {
        audio.current?.pause();
        setIsPaused(true)
    }

    function handleStop() {
        if (audio.current) {
            audio.current.pause();
            audio.current.currentTime = 0;
            setPlaying(false);
        }
    }

    function handleTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
        if (track.current && audio.current && elapsed.current) {
            track.current.value = String(audio.current.currentTime);
            elapsed.current.textContent = buildDuration(e.currentTarget.currentTime)
        }
    }

    function handleTrackChange() {
        if (track.current && audio.current && elapsed.current) {
            elapsed.current.textContent = buildDuration(Number(track.current.value));
            audio.current.currentTime = Number(track.current.value);
        }
    }

    function handleVolume() {
        if (volume.current && audio.current && volumeValue.current) {
            audio.current.volume = Number(volume.current.value);
            volumeValue.current.textContent = Number(volume.current.value) * 100 + '%';
        }
    }

    return (
        <div>
            <div>
                <Input ref={track} className={'w-1/4'} type={'range'} min={0} max={duration} defaultValue={0} onInput={handleTrackChange} />
                <span ref={elapsed}>0:00</span> / <span ref={trackTime}>{buildDuration(duration)}</span>
            </div>
            <div className={'flex'}>
                <audio
                    ref={audio}
                    src={'/sounds/KANNA movie version.ogg'}
                    preload={'metadata'}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onTimeUpdate={handleTimeUpdate}
                />
                <LucidePlayCircle width={32} height={32} onClick={handlePlay} className={isPlaying && !isPaused ? 'hidden' : 'initial'} />
                <LucidePauseCircle width={32} height={32} onClick={handlePause} className={isPlaying && !isPaused ? 'initial' : `hidden`} />
                <LucideStopCircle width={32} height={32} onClick={handleStop} className={isPlaying ? 'initial' : `hidden`} />
            </div>
            <div>
                <Input type={'range'} min={0} max={1} step={0.1} defaultValue={1} ref={volume} className={'md:w-1/4'} onInput={handleVolume} />
                <span ref={volumeValue}>100%</span>
            </div>
        </div>
    );
};

export default SoundCustom;
