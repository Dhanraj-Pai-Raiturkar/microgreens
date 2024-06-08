import mongoose, { Mongoose } from 'mongoose';
import config from '../config/index';
class MongooseSingleton {
  private _mongoose: any;
  constructor() {
    if (!this._mongoose) {
      this._connect();
      this._mongoose = this._mongoose;
    }
    return this._mongoose;
  }

  async _connect() {
    try {
      const uri = config.mongoDbConnectionString;
      console.log('uri', uri);
      const connection = await mongoose.connect(uri);
      console.log('MongooseSingleton connection successful');
      return connection;
    } catch (error) {
      console.error('MongooseSingleton::_connect error', error);
      throw error;
    }
  }
}

export default MongooseSingleton;
