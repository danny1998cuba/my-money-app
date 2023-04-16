import { Router } from 'express';
import { CurrencyController } from '@src/controllers';
import Paths from '../constants/Paths';
import jetValidator from 'jet-validator/dist/jet-validator';
import { DboCommonsCurrency } from '@src/models';

const currRouter = Router(), validate = jetValidator();

// Get all
currRouter.get(
    Paths.Currency.All,
    CurrencyController.getAll,
);

// Get one
currRouter.get(
    Paths.Currency.Get,
    validate(['id', 'number', 'params']),
    CurrencyController.getById,
);

// Add one
currRouter.post(
    Paths.Currency.Add,
    validate(['curr', DboCommonsCurrency.isEntity]),
    CurrencyController.add,
);

// Update one
currRouter.put(
    Paths.Currency.Update,
    validate(['curr', DboCommonsCurrency.isEntity]),
    CurrencyController.update,
);

// Delete one
currRouter.delete(
    Paths.Currency.Delete,
    validate(['id', 'number', 'params']),
    CurrencyController.delete,
);

export default currRouter;