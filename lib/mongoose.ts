import mongoose from 'mongoose';
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URL) return console.log("Mongodn not found");
    if(isConnected) return console.log("already connect");
    try{
await mongoose.connect(process.env.MONGODB_URL);
isConnected=true;
console.log("conencted");
    }catch(error){
console.log("erro");
    }
}