/** @flow */
import { Router } from 'express';
import mongoose from 'mongoose';

let router = Router();

export default function (app: Object) : Object {

  let Vote = mongoose.model('Vote');

  router.get('/', (req, res) => {
    Vote.find({}).populate('user').exec((err, models) => {
      if (err) return res.status(500).json({err});
      return res.json(models);
    });
  });

  return router;

}
