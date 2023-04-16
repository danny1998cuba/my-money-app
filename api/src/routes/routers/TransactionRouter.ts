import { Router } from 'express';
import { TransactionController } from '@src/controllers';
import Paths from '../constants/Paths';
import jetValidator from 'jet-validator/dist/jet-validator';
import { DboResellTransaction } from '@src/models';

const transactionRouter = Router(), validate = jetValidator();

// Get all
transactionRouter.get(
    Paths.Resell.Transaction.All,
    TransactionController.getAll,
);

// Get one
transactionRouter.get(
    Paths.Resell.Transaction.Get,
    validate(['id', 'number', 'params']),
    TransactionController.getById,
);

// Add one
transactionRouter.post(
    Paths.Resell.Transaction.Add,
    validate(['transaction', DboResellTransaction.isEntity]),
    TransactionController.add,
);

// Update one
transactionRouter.put(
    Paths.Resell.Transaction.Update,
    validate(['transaction', DboResellTransaction.isEntity]),
    TransactionController.update,
);

// Delete one
transactionRouter.delete(
    Paths.Resell.Transaction.Delete,
    validate(['id', 'number', 'params']),
    TransactionController.delete,
);

export default transactionRouter;