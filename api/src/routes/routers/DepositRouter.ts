import { Router } from 'express';
import { DepositController } from '@src/controllers';
import Paths from '../constants/Paths';
import jetValidator from 'jet-validator/dist/jet-validator';

const depositRouter = Router(), validate = jetValidator();

// Get all
depositRouter.get(
    Paths.Resell.Deposit.All,
    DepositController.getAll,
);

// Get one
depositRouter.get(
    Paths.Resell.Deposit.Get,
    validate(['id', 'number', 'params']),
    DepositController.getById,
);

export default depositRouter;