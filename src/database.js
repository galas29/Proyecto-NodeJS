import {connect} from 'mongoose';


(async () => {
   try {
    const db = await connect("mongodb://localhost:27017/Betrunken");
    console.log("DB conectada en", db.connection.name);
   } catch (error) {
    console.error(error);
   }
   
})();

