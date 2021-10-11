//frontend
socketService.emit('add like', { creatorId: stationToUpdate.createdBy.id, currUser: user, stationName: stationToUpdate.name })


//backend
socket.on('add like', ({ userIdliked, currUser, stationName }) => {
    if (userIdliked === currUser._id) return
    let obj = { username: currUser.username, stationName: stationName };
    socket.broadcast.to(`${userIdliked}`).emit('send notification', obj);
})


socketService.on('send notification', (obj) => {
    showNotificationMsg(obj.username + ' liked your playlist: ' + obj.stationName)
    eventBusService.emit(obj.username)
})

export function showUserMsg(txt, type = '') {
    eventBusService.emit('show-user-msg', { txt, type })
}
export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}