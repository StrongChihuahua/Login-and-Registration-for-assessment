const Post = require('../../Schema/Post')

module.exports = getPost = async (req, res) => {

    try {
        let post = await Post.findById({_id: req.params.id}).exec();
        if(post) return res.json(post);
        return res.status(404).json({msg: 'Post not found'});
    } catch(err) {
        return res.status(404).json({msg: err});
    }


    // Post.findById({_id: req.params.id})
    //     .then( post => {
    //         res.json(post);
    //     })
    //     .catch(() => {
    //         res.status(404).json({msg: 'Not found!'});
    //     })
}