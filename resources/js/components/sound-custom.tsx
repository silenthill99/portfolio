import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { LucidePauseCircle, LucidePlayCircle, LucideStopCircle } from 'lucide-react';

const SoundCustom = () => {

    const audio = useRef<HTMLAudioElement>(null)

    return (
        <div>
            <div>
                <Input className={'w-1/4'} type={'range'} id={'track'} min={0} defaultValue={0} />
                <span id="elapsed">0:00</span> / <span id="track-time">1:00</span>
            </div>
            <div className={'flex'}>
                <audio ref={audio} src={'/sounds/KANNA movie version.ogg'} />
                <LucidePlayCircle width={32} height={32} id={'play-button'} />
                <LucidePauseCircle width={32} height={32} className={'hidden'} id={'pause-button'} />
                <LucideStopCircle width={32} height={32} className={'hidden'} id={'stop-button'} />
            </div>
            <div>
                <Input type={"range"} min={0} max={1} step={0.1} defaultValue={1} className={"md:w-1/4"}/>
                <span id={"volume-value"}>100%</span>
            </div>
        </div>
    );
};

export default SoundCustom;
