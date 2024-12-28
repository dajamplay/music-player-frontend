import axiosClient from "@/axios/axios.js";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";
import styles from './Admin.module.scss';

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
        return date.toString();
    }

    useEffect(() => {
        getTimeLastUpdateTracksTable()
    }, []);

    const addTrack = async () => {
        if (trackForUpload) {
            let formData = new FormData();
            formData.append('file', trackForUpload);
            const response = await axiosClient.post('/add_track', formData);
            if (response?.data?.errors?.file) {
                setErrors(response?.data?.errors?.file);
            } else {
                setIsUpdated(true);
                setUpdatedCount(response?.data?.updated);
                setFailedCount(response?.data?.failed);
            }
        } else {
            alert('Нужно выбрать трек');
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setTrackForUpload(e.target.files[0]);
            setErrors([]);
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
        await getTimeLastUpdateTracksTable();
    }

    const testDateUpdate = async () => {
        alert(await getTimeLastUpdateTracksTable());
    }

    return(
        <div>
            <h1>Панель администрирования</h1>
            <h2>Последнее обновление БД: {timeLastUpdate}</h2>
            <h2 className={styles.errors_title}>Ошибки: {errors?.length ?? '0'}</h2>
            {errors.length > 0 && errors.map( (item, index) =>
                <p className={styles.error_container} key={index}>{item}</p>
            )}
            {isUpdated && <h2>Обновлено: {updatedCount}</h2>}

            <input type="file" onChange={handleFileChange}/>
            <Button onClick={addTrack} title="Добавить трек в БД"/>
            <Button onClick={testDateUpdate} title="Проверить дату обновления"/>
            <Button onClick={updateTracks} title="Полное обновление БД"/>
        </div>
    );
}

export default Admin;
