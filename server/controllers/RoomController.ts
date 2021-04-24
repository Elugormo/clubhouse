import express from "express";
import { Room } from "../../models";
class RoomController {
  async index(req: express.Request, res: express.Response) {
    try {
      const items = await Room.findAll();
      console.log(items);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const data = {
        title: req.body.title,
        type: req.body.type,
      };

      if (!data.title || !data.type) {
        return res.status(400).json({ message: "Missing title or room type" });
      }

      const room = await Room.create(data);
      console.log(room);
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async show(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: "Incorrect room ID " });
      }

      const room = await Room.findByPk(roomId);

      if (!room) {
        return res.status(404).json({ message: "Rooms is not found " });
      }

      res.json(room);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error", error });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: "Incorrect room ID " });
      }

      await Room.destroy({
        where: { id: roomId },
      });

      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error", err });
    }
  }
}

export default new RoomController();
