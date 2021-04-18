import express from 'express';
import dotenv from 'dotenv';
import sharp from 'sharp';
import fs from 'fs';
import cors from 'cors';
import { passport } from './core/passport';
import { uploader } from './core/uploader';

import AuthController from './controllers/AuthController';

dotenv.config({
  path: 'server/.env',
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/auth/me', passport.authenticate('jwt', { session: false }), AuthController.getMe);
app.get('/auth/sms', passport.authenticate('jwt', { session: false }), AuthController.sendSMS);
app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/sms/activate',
  passport.authenticate('jwt', { session: false }),
  AuthController.activate,
);
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  AuthController.authCallback,
);

app.post('/upload', uploader.single('photo'), (req, res) => {
  const filePath = req.file.path;
  sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(filePath.replace('.png', '.jpeg'), (err) => {
      if (err) {
        throw err;
      }

      fs.unlinkSync(filePath);

      res.json({
        url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
      });
    });
});


app.listen(3001, () => {
  console.log("Server is running");
});
