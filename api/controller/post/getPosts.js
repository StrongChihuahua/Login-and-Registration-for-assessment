const Post = require('../../Schema/Post')

module.exports = getPosts = async (req, res) => {

    try {
        let posts = await Post.find().sort({createdAt:-1}).exec();
        if(posts) {

            console.log(typeof req.io) // from middleware na kung san naka-attach yung socket io server ko
            return res.json(posts); // <-- Ito yawba 
        }
        return res.status(404).json({msg: 'No post found!'});
    } catch (err) {
        return res.status(404).json({errMsg: err});
    }
}
