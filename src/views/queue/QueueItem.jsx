import {useMusicPlayerContext} from "@/music_player/MusicPlayerProvider.jsx";
import TrackContainer from "@/components/track/TrackContainer.jsx";
import TrackImage from "@/components/track/TrackImage.jsx";
import TrackTitle from "@/components/track/TrackTitle.jsx";
import TrackPlayPauseButton from "@/components/track/TrackPlayPauseButton.jsx";
import TrackQueueSettings from "@/components/track/TrackQueueSettings.jsx";
import TrackQueueSettingsModal from "@/components/track/TrackQueueSettingsModal.jsx";
import {useState} from "react";

const QueueItem = ({track, onDrop, onDragStart}) => {
    const {load, pause, play, remove, isPlaying, currentTrack} = useMusicPlayerContext();
    const [showModal, setShowModal] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const onClickHandle = (track) => {
        if (currentTrack.queue_id === track.queue_id) {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        } else {
            load(track);
        }
    }

    const queueSettingsHandle = (e) => {
        e.stopPropagation();
        setShowModal(value => !value);
        setTimeout( () => {
            setShowModal(false);
        }, 10000);
    }

    const onDragOver = (e) => {
        setIsDragOver(true);
        e.preventDefault();
    }

    const onDragLeave = () => {
        setIsDragOver(false);
    }

    const onDragEnd = () => {
        setIsDragOver(false);
    }

    const deleteTrackFromQueue = (e) => {
        e.stopPropagation();
        remove(track);
    }

    return(
        <div
            onClick={() => {
                onClickHandle(track)
            }}
            draggable={true}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
        >
            <TrackContainer
                isActive={currentTrack.queue_id === track.queue_id}
                isDragOver={isDragOver}
            >
                <TrackImage
                    src={import.meta.env.VITE_APP_BASE_URL + track.artwork}
                    alt={track.title}
                />
                <TrackTitle
                    title={track.title}
                    artist={track.artist}
                />
                <TrackPlayPauseButton
                    isPlaying={isPlaying}
                    isActive={currentTrack.queue_id === track.queue_id}
                />
                <TrackQueueSettings onClick={queueSettingsHandle}/>
                <TrackQueueSettingsModal
                    deleteTrackFromQueue={deleteTrackFromQueue}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </TrackContainer>
        </div>
    );
}

export default QueueItem;
