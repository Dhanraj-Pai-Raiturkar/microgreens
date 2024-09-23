import mongoose from 'mongoose';

export type UserModelType = {
  sub: string;
  firstName: string;
  lastName?: string;
  gender?: string;
  dob: Date;
  email: string;
  mobile?: string;
  countryCode?: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  addressLine1: string;
  addressLine2: string;
  verified: string;
  role: string;
};

export const UserModelSchema = new mongoose.Schema<UserModelType>(
  {
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
      required: false,
      index: true
    },
    state: {
      type: String,
      required: false,
      index: true
    },
    country: {
      type: String,
      required: false,
      index: true
    },
    pincode: {
      type: Number,
      required: false
    },
    addressLine1: {
      type: String,
      required: false
    },
    addressLine2: String,
    verified: Boolean,
    role: String
  },
  { timestamps: true }
);

export default mongoose.model('User', UserModelSchema);
