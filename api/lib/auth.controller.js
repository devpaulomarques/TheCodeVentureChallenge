exports.github = (req, res) => {
    const io = req.app.get('io')
    
    const user = {
        name: req.user.username,
        photo: req.user.photos[0].value,
        user: req.user
    }
    io.in(req.session.socketId).emit('github', user)
    res.end()
} 