import express from "express";
import { Axios } from "../../core/axios";
const User = require("../../models").User;
const Code = require("../../models").Code;
import { generateRandomCode } from "../../utils/generateRandomCode";

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  authCallback(req: express.Request, res: express.Response) {
    console.log(req.user);
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user
      )}', '*');window.close();</script>`
    );
  }

  async activate(req: express.Request, res: express.Response) {
    const userId = req.user.id;
    const smsCode = req.query.code;

    if (!smsCode) {
      return res.status(400).json({ message: "Введите код активации" });
    }

    const whereQuery = { code: smsCode, user_id: userId };

    console.log(whereQuery);

    try {
      const findCode = await Code.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await Code.destroy({
          where: whereQuery,
        });
        await User.update({ isActive: 1 }, { where: { id: userId } });
        return res.send();
      } else {
        res.status(400).json({
          message: "Код не найден",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ошибка при активации аккаунта",
      });
    }
  }

  async sendSMS(req: express.Request, res: express.Response) {
    console.log(123);
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = generateRandomCode();

    if (!phone) {
      return res.status(400).json({
        message: "Номер телефона не указан",
      });
    }

    try {
      await Axios.get(
        `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79992234564&msg=${smsCode}`
      );
      //   await Axios.post(
      //     "https://im.smsclub.mobi/sms/send",
      //     {
      //       phone: [phone],
      //       message: smsCode,
      //       src_addr: "Clubhouse",
      //     },
      //     {
      //       headers: {
      //         "Content-Type:": "application/json",
      //         "Authorization:": "VsJD0s3CulsNG6i ",
      //       },
      //     }
      //   );

      const findCode = await Code.findOne({
        where: {
          user_id: userId,
        },
      });

      if (findCode) {
        return res.status(400).json({ message: "Код уже был отправлен" });
      }

      await Code.create({
        code: smsCode,
        user_id: userId,
      });

      res.status(201).send();
    } catch (error) {
      res.status(500).json({
        message: "Ошибка при отправке СМС-кода",
      });
    }
  }
}

export default new AuthController();
