import UserModel, { UserModelType } from '../models/UserModel';

class UserRepository {
  constructor() {}

  async createUser(user: UserModelType) {
    try {
      const response = new UserModel(user);
      const data = await response.save();
      console.log('UserRepository::createUser user created successfuly', data);
      return;
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }

  async findUser(email: string) {
    try {
      const response = await UserModel.findOne({ email }).exec();
      console.log('UserRepository::createUser user found', response);
      return response;
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }

  async updateUser(email: string, data: any) {
    try {
      const response = await UserModel.findOneAndUpdate({ email }, data);
      console.log('UserRepository::updateUser update response', response);
      return response;
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }
}

export default UserRepository;
