const QUEUE_KEY = 'QUEUE_KEY';

export const getQueue = () => {
    try {
        const jsonValue = localStorage.getItem(QUEUE_KEY);
        return jsonValue !== '' ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e);
    }
};

export const setQueue = (queue) => {
    try {
        const jsonValue = JSON.stringify(queue);
        if (jsonValue.length > 0) {
            localStorage.setItem(QUEUE_KEY, jsonValue);
        } else {
           return false;
        }
    } catch (e) {
        console.log(e);
    }
};

export const addTrackQueue = (track) => {
    try {
        const queue = getQueue() ?? [];
        queue.push(track);
        const jsonValue = JSON.stringify(queue);
        localStorage.setItem(QUEUE_KEY, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const clearQueue = () => {
    try {
        localStorage.setItem(QUEUE_KEY, '');
    } catch (e) {
        console.log(e);
    }
};

export const deleteTrackFromQueue = (trackId) => {
    let queue = getQueue();
    queue = queue.filter( (track) => {
        return track.queue_id !== trackId;
    });
    const jsonValue = JSON.stringify(queue);
    localStorage.setItem(QUEUE_KEY, jsonValue);
};
