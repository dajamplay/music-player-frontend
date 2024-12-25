import {useMusicPlayerContext} from "@/music_player/MusicPlayerProvider.jsx";
import {useDispatch} from "react-redux";
import {addTrackToQueueAction} from "@/store/actions/queueActions.js";
import {prepareTrackForQueue} from "@/utils/track.js";
import TrackImage from "@/components/track/TrackImage.jsx";
import TrackTitle from "@/components/track/TrackTitle.jsx";
import TrackContainer from "@/components/track/TrackContainer.jsx";
import TrackPlayPauseButton from "@/components/track/TrackPlayPauseButton.jsx";
import TrackAddToQueue from "@/components/track/TrackAddToQueue.jsx";

const TrackItem = ({track}) => {
    const {load, pause, play, currentTrack, isPlaying} = useMusicPlayerContext();
    const dispatch = useDispatch();

    const addToQueue = (e) => {
        e.stopPropagation();
        const trackForQueue = prepareTrackForQueue(track);
        dispatch(addTrackToQueueAction(trackForQueue));
        alert('Добавлен в очередь');
    }

    const playWithoutQueue = () => {
        if (currentTrack.id === track.id) {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        } else {
            load(track);
        }
    }

    return(
        <div onClick={playWithoutQueue}>
            <TrackContainer
                isActive={currentTrack.id === track.id}
            >
                <TrackImage
                    isPlaying={isPlaying}
                    isActive={currentTrack.id === track.id}
                    src={import.meta.env.VITE_APP_BASE_URL + track.artwork}
                    alt={track.title}
                />
                <TrackTitle
                    title={track.title}
                    artist={track.artist}
                />
                <TrackPlayPauseButton
                    isPlaying={isPlaying}
                    isActive={currentTrack.id === track.id}
                />
                <TrackAddToQueue onClick={addToQueue}/>
            </TrackContainer>
        </div>
    );
}

export default TrackItem;
