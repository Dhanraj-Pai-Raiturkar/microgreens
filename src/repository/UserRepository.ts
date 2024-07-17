import UserModel, { UserModelType } from '../models/UserModel';

class UserRepository {
  constructor() {}

  async create(user: UserModelType) {
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

  async read(query: any) {
    try {
      const response = await UserModel.find(query).exec();
      console.log('UserRepository::createUser user found', response);
      return response;
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }

  async update(email: string, data: any) {
    try {
      const response = await UserModel.findOneAndUpdate({ email }, data);
      console.log('UserRepository::updateUser update response', response);
      return response;
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }

  async delete(sub: string) {
    try {
      await UserModel.deleteOne({ sub });
    } catch (error) {
      console.error('UserRepository createUser error', error);
      throw error;
    }
  }
}

export default UserRepository;
