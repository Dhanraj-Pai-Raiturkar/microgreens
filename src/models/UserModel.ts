import mongoose from 'mongoose';

export const UserModelSchema = new mongoose.Schema({
  sub: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        if (value?.length <= 1) {
          return false;
        }
      },
      message: 'name has to be more than 1 character long'
    }
  },
  lastName: String,
  gender: String,
  dob: Date,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Please enter a valid email'
    }
  },
  mobile: Number,
  countryCode: Number,
  city: {
    type: String,
    required: true,
    index: true
  },
  state: {
    type: String,
    required: true,
    index: true
  },
  country: {
    type: String,
    required: true,
    index: true
  },
  pincode: {
    type: Number,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: String,
  verified: Boolean,
  role: String
});

export default mongoose.model('User', UserModelSchema);
