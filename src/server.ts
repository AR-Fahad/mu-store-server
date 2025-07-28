import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { sendVerificationEmail } from './app/utils/sendEmail';

const main = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    app.listen(config.port, () => {
      console.log(`MU Store server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
