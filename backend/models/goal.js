import mongoose from 'mongoose';

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value']
    }
  },
  {
    timestamp: true
  }
);

export default mongoose.model('Goal', goalSchema);
