import axiosClient from "@/axios/axios.js";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";

const Admin = () => {

    const [updateStatus, setUpdateStatus] = useState('Не обновлено');
    const [updatedCount, setUpdatedCount] = useState(0);
    const [failedCount, setFailedCount] = useState(0);
    const [isUpdated, setIsUpdated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [timeLastUpdate, setTimeLastUpdate] = useState();

    const [trackForUpload, setTrackForUpload] = useState();

    const getTimeLastUpdateTracksTable = async () => {
        const response = await axiosClient.get('/last_update');
        const data = response.data
        const date = new Date(data).toLocaleString("ru-RU")
        setTimeLastUpdate(date.toString());
    }

    useEffect(() => {
        getTimeLastUpdateTracksTable()
    }, []);

    const addTrack = async () => {
        if (trackForUpload) {
            let formData = new FormData();
            formData.append('file', trackForUpload);
            const response = await axiosClient.post('/add_track', formData);
            console.log(response.data);
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setTrackForUpload(e.target.files[0]);
        }
    };

    const updateTracks = async () => {
        setUpdateStatus('Идет обновление');
        const response = await axiosClient.get('/update');

        let data = response.data;

        if (data.errors.length > 0) {
            setUpdateStatus(data.errors[0]);
        } else {
            setUpdateStatus(data.status);
        }

        setIsUpdated(true);
        setUpdatedCount(data.updated);
        setFailedCount(data.failed);
        setErrors(data.errors);
        console.log(data)
        await getTimeLastUpdateTracksTable();
    }

    return(
        <div>
            <h1>Admin</h1>
            <p>Последнее обновление: {timeLastUpdate}</p>
            {isUpdated &&
                <div>
                    <p>Статус: {updateStatus}</p>
                    <p>Обновлено: {updatedCount}</p>
                    <p>Ошибок: {failedCount}</p>
                </div>
            }
            <Button onClick={updateTracks} title="Обновить"/>

            <input type="file" onChange={handleFileChange} />
            <Button onClick={addTrack} title="Добавить трек"/>
        </div>
    );
}

export default Admin;
