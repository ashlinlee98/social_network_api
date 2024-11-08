import express from 'express';
const router = express.Router();

// Example route
router.get('/example', (req, res) => {
  res.send('This is an example route!');
});

// Export the router
export default router;
