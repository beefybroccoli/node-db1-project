const modelAccounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  if (!req.params.id){
    res.status(404).json({ message: "account not found" });
  }else{
    modelAccounts.getById(req.params.id)
      .then(account=>{
        if (!Boolean(account.length)){
          res.status(404).json({ message: "account not found" });
        }else{
          req.account = account[0];
          next();
        }
      })
      .catch(err=>{
        res.status(500).json({ message: "error retrieving account" });
      })
  }
}

