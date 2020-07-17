import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import userSerializer from '../serializers/user';

export default {
  authorization: (req: Request, res: Response, next: NextFunction) => {
    next();
  },

  index: async (req: Request, res: Response) => {
    try {
      const users: Array<User> = await database(Table.users).select();
      res.status(200).json(userSerializer.index(users));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const user: User = await database(Table.users).where({ id: req.params.id }).first();
      if (user) {
        res.status(200).json(userSerializer.show(user));
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const user: Partial<User> = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      await database(Table.users).insert(user);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const user: User = await database(Table.users).where({ id: req.params.id }).first();
      if (user) {
        const updatedUser: Partial<User> = {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        };
        await database(Table.users)
          .where({ id: req.params.id })
          .update(updatedUser);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  destroy: async (req: Request, res: Response) => {
    try {
      const user: User = await database(Table.users).where({ id: req.params.id }).first();
      if (user) {
        await database(Table.users)
          .where({ id: req.params.id })
          .delete();
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
};
