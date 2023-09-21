const mongoose = require("mongoose");

const databaseCONNECTION =  async()=> {
    try {
   await mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log("MONGODB is sucessfully connected...");
    } catch (error) {
      console.log(error);
    }
};
//exporting databaseCONNECTION
module.exports = databaseCONNECTION;