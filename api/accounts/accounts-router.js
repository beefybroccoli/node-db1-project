const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.status(200).json({message:"reached GET /"});
})

router.get('/:id', (req, res, next) => {
  res.status(200).json({message:"reached GET /:id"});
})

router.post('/', (req, res, next) => {
  res.status(201).json({message:"reached POST /"});
})

router.put('/:id', (req, res, next) => {
  res.status(201).json({message:"reached PUT /:id"});
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({message:"reached DELETE /:id"});
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `unknown error occured: ${err.message}`,
    stack: err.stack,
  })
})

module.exports = router;