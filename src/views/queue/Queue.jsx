import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearQueueAction, loadQueueFromLocalStorageAction, reorderQueueTracks} from "@/store/actions/queueActions.js";
import Button from "@/components/ui/Button/Button.jsx";
import QueueItem from "@/views/queue/QueueItem.jsx";

const Queue = () => {

    const {tracks} = useSelector(state => state.queue);
    const dispatch = useDispatch();
    const [currentDragTrack, setCurrentDragTrack] = useState(null);

    useEffect(() => {
        dispatch(loadQueueFromLocalStorageAction());
    }, []);

    const clearQueueHandler = () => {
        dispatch(clearQueueAction());
    }

    const onDragStart = (e, track) => {
        setCurrentDragTrack(track);
    }

    const onDrop = (e, track) => {
        e.preventDefault();
        if (!currentDragTrack || !track) return;
        if (currentDragTrack.queue_id === track.queue_id) return;
        let currentIndex = tracks.indexOf(currentDragTrack);
        let dropIndex = tracks.indexOf(track);
        dispatch(reorderQueueTracks({currentIndex, dropIndex}));
        setCurrentDragTrack(null);
    }

    return(
        <>
            <h1>Проигрыватель</h1>
            <Button title={"Очистить очередь"} onClick={clearQueueHandler}/>
            {tracks?.map((track) => (
                <QueueItem
                    track={track}
                    key={track.queue_id}
                    onDrop={ (e) => {onDrop(e, track)}}
                    onDragStart={ (e) => {onDragStart(e, track)}}
                />
            ))}
        </>
    );
}

export default Queue;
