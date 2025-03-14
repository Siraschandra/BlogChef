import { verifyToken } from '../../controllers/user.js';
export default async (req, res) => {
  try {
    const { token } = req.body;
    await verifyToken(token);
    res.json({ status: true });
  } catch (error) {
    res.status(403).json(error);
  }
};
