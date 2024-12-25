import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTrackFromQueueAction} from "@/store/actions/queueActions.js";

const MusicPlayerContext = createContext({
    play: () => {},
    pause: () => {},
    load: () => {},
    seekTo: () => {},
    next: () => {},
    prev: () => {},
    remove: () => {},
    isPlaying: false,
    currentTrack: {},
    musicPlayer: new Audio(),
    position: 0,
});

export const MusicPlayerProvider = ({children}) => {

    const musicPlayer = useRef(new Audio()).current;
    const [currentTrack, setCurrentTrack] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const intervalRef = useRef();
    const {tracks} = useSelector(state => state.queue);
    const dispatch = useDispatch();
    const msUpdate = 1000;

    const endedEvent = useCallback((e) => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setPosition(0);
        next();
    }, [tracks, currentTrack]);

    const errorEvent = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        console.log('ERROR');
    }

    useEffect( () => {
        musicPlayer.addEventListener("ended" , endedEvent);
        musicPlayer.addEventListener("error" , errorEvent);

        return () => {
            musicPlayer.removeEventListener("ended", endedEvent);
            musicPlayer.removeEventListener("error", errorEvent);
        }
    }, [endedEvent]);

    const load = (track) => {
        setPosition(0);
        musicPlayer.src = import.meta.env.VITE_APP_BASE_URL + track.url;
        setCurrentTrack(track);
        play();
    }

    const pause = () => {
        clearInterval(intervalRef.current);
        if (isPlaying) musicPlayer.pause();
        setIsPlaying(false);
    }

    const play = () => {
        clearInterval(intervalRef.current);
        musicPlayer.play().then( () => {
            intervalRef.current = setInterval( () => {
                setPosition(musicPlayer.currentTime);
            }, msUpdate);
            setIsPlaying(true);
        });
    }

    const remove = (track) => {
        if (track.queue_id === currentTrack.queue_id) {
            setCurrentTrack({});
            setPosition(0);
            pause();
        }
        dispatch(deleteTrackFromQueueAction(track.queue_id));
    }

    const next = () => {
        if (tracks.length <= 0) return;

        const currentTrackIndex = tracks.indexOf(currentTrack);

        if (currentTrackIndex === -1) {
            load(tracks[0]);
            return;
        }

        if (tracks.length - 1 > currentTrackIndex) {
            load(tracks[currentTrackIndex + 1]);
        } else {
            load(tracks[0]);
        }
    }

    const prev = () => {
        if (tracks.length <= 0) return;

        const currentTrackIndex = tracks.indexOf(currentTrack);

        if (currentTrackIndex === -1) {
            load(tracks[0]);
            return;
        }

        if (currentTrackIndex > 0) {
            load(tracks[currentTrackIndex - 1]);
        } else {
            load(tracks[tracks.length - 1]);
        }
    }

    const seekTo = (position) => {
        clearInterval(intervalRef.current);
        setPosition(position);
        musicPlayer.currentTime = position;
        play();
    }

    return(
        <MusicPlayerContext.Provider
            value={{
                play,
                pause,
                load,
                seekTo,
                next,
                prev,
                remove,
                currentTrack,
                isPlaying,
                musicPlayer,
                position,
            }}
        >{children}</MusicPlayerContext.Provider>
    );
};

export const useMusicPlayerContext = () => useContext(MusicPlayerContext);
