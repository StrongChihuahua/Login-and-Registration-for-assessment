const Post = require('../../Schema/Post')

module.exports = createPost = async (req, res) => {

    try {
        let post = await Post.findById({_id: req.params.id}).exec();
        if (post) return res.json(post.comments); 
        return res.status(404).json({msg: 'Post not found'});
    } catch(err) {
        return res.status(404).json({msg: err});
    }


    // Post.findById({_id: req.params.id})
    // .then( post => {
    //    if(post) res.json(post.comments);
    //    return res.status(404).json({msg: 'Not found!'});
    // })
    // .catch(() => {
    //     res.status(404).json({msg: 'Not found!'});
    // })

    // try {
    // Post.findById({_id: req.params.id})
    //     .catch((err) => {
    //         res.status(500).json({Error: err});
    //     })
    //     .then( post => {
    //         if(post) {
    //             res.json(post.comments);
    //         }

    //         res.status(404).json({msg: 'Post not found!123'})
    //     })
    // } catch (err) {
    //     res.status(500).json({Error: err})
    //     console.log(err)
    // }
}
