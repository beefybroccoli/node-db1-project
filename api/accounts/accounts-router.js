const router = require('express').Router()
const model = require("./accounts-model");
const middleware = require("./accounts-middleware");

router.get('/', async (req, res, next) => {
  const accounts = await model.getAll();
  res.status(200).json(accounts);
})

router.get('/:id', middleware.checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, (req, res, next) => {
  res.status(201).json(req.newAccount);
})

router.put('/:id', (req, res, next) => {
  res.status(201).json({message:"reached PUT /:id"});
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  try{
    const result = await model.deleteById(req.params.id);
    res.status(201).json(`deleted account ${req.params.id}`);
  }catch(err){
    next(err);
  }
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `unknown error occured: ${err.message}`,
    stack: err.stack,
  })
})

module.exports = router;