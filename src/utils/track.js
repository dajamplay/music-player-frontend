export const prepareTrackForQueue = (track) => ({
    ...track,
    queue_id: Date.now(),
});
