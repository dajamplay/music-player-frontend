import {useSelector} from "react-redux";
import TrackItem from "@/views/library/TrackItem.jsx";
import {useEffect, useState} from "react";
import styles from './Tracks.module.scss';

const Tracks = () => {
    const {tracks} = useSelector(state => state.lib);
    const [searchText, setSearchText] = useState('');
    const [filteredTracks, setFilteredTracks] = useState([]);

    useEffect(() => {
        setFilteredTracks(tracks);
    }, [tracks]);

    useEffect( () => {
        if (searchText === '') {
            setFilteredTracks(tracks);
        } else {
            const data = tracks.filter( (item) => {
                return item.title.toLowerCase().includes(searchText.toLowerCase())
                    || item.artist.toLowerCase().includes(searchText.toLowerCase());
            });
            setFilteredTracks(data);
        }

    }, [searchText]);

    const changeTextHandler = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    return(
        <div>
            <h1>Библиотека</h1>
            <div className={styles.search_container}>
                <input
                    type="text"
                    onChange={changeTextHandler}
                    value={searchText}
                    className={styles.search}
                    placeholder={'Поиск'}
                />
            </div>
            <div className={styles.tracks_container}>
                {filteredTracks.map(track => <TrackItem track={track} key={track.track_id}/>)}
            </div>
        </div>
    );
}

export default Tracks;
