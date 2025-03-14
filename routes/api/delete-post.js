import { deletePost } from '../../controllers/post.js';
import { deleteCache } from '../../controllers/cache.js';

export default async (req, res) => {
  try {
    const postId = req.params.postId;
    await deletePost(postId);
    deleteCache([`post:${postId}`, 'all-posts']);
    res.json({ status: true });
  } catch (error) {
    res.status(401).json({ error });
  }
};
