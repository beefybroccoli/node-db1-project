const modelAccounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  // - If either name or budget are undefined, return `{ message: "name and budget are required" }`
  if(false){
  // if(name === null || name === undefined || budget === null || budget === undefined ){
    console.log("typeof name = ", typeof name, ", ", "typeof budget = ", typeof budget);
    res.status(400).json({ message: "name and budget are required" });
  }
  else if(name === null){
    // console.log("typeof name = ", typeof name);
    res.status(400).json({ message: "name and budget are required, case 1"});
  }
  else if(name === undefined){
    // console.log("typeof name = ", typeof name);
    res.status(400).json({ message: "name and budget are required, case 2" });
  }
  else if(budget === null){
    console.log("typeof budget = ", typeof budget, ", ", budget);
    res.status(400).json({ message: "name and budget are required, case 3" });
  }
  else if(budget === undefined ){
    // console.log("typeof budget = ", typeof budget);
    res.status(400).json({ message: "name and budget are required, case 4" });
  }
  //   - If name is not a string, return `{ message: "name of account must be a string" }`
  else if (typeof(name) !== "string"){
    res.status(400).json({ message: "name of account must be a string" });
  }
  //   - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
  else if (name.trim().length < 3 || name.trim().length > 100 ){
    res.status(400).json({ message: "name of account must be between 3 and 100" });
  }
  //   - If budget is not a number, return `{ message: "budget of account must be a number" }`
  else if (typeof budget !== "number"){
    res.status(400).json({ message: "budget of account must be a number" });
  }
  //   - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`
  else if ( budget < 0 || budget > 1e6){
    res.status(400).json({ message: "budget of account is too large or too small" });
  }else{
    req.modifiedAccount = {name:name.trim(),budget};
    next();
  }
}

/*
- `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
*/
exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const {name, budget} = req.body;
    const account_id = await modelAccounts.create({name:name.trim(), budget});
    const newAccount = await modelAccounts.getById(account_id);
    req.newAccount = newAccount[0];
    // console.log("req.newAccount = ", req.newAccount);
    next();
  }catch (err){
    res.status(400).json({ message: "that name is taken" })
  }
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

