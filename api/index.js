import { Router } from 'express';
import Todo from '../model/todo';
import mongoose from 'mongoose';

const router = new Router();

router.get('/todos', (req, res, next) => {
  Todo.find()
    .then(todos => res.send(todos))
    .catch(next);
});

router.post('/todos', (req, res, next) => {
  Todo.create({ text: req.body.text, done: false })
    .then(() => Todo.find().then(todos => res.json(todos)).catch(next))
    .catch(next);
});

router.put('/todos', (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  Todo.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, { text: req.body.text, done: req.body.done })
    .then(() => Todo.find().then(todos => res.json(todos)).catch(next))
    .catch(next);
});

router.delete('/todos/:todoid', (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  Todo.remove({ _id: new ObjectId(req.params.todoid) })
    .then(() => Todo.find().then(todos => res.json(todos)).catch(next))
    .catch(next);
});

// error handle
router.use((err, req, res, next) => {
  if (err) res.send(err);
  next();
});



export default router;
