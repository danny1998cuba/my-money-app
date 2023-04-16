import { Router } from 'express';
import { ExtractionController } from '@src/controllers';
import Paths from '../constants/Paths';
import jetValidator from 'jet-validator/dist/jet-validator';
import { DboResellExtraction } from '@src/models';

const extractionRouter = Router(), validate = jetValidator();

// Get all
extractionRouter.get(
    Paths.Resell.Extraction.All,
    ExtractionController.getAll,
);

// Get one
extractionRouter.get(
    Paths.Resell.Extraction.Get,
    validate(['id', 'number', 'params']),
    ExtractionController.getById,
);

// Add one
extractionRouter.post(
    Paths.Resell.Transaction.Add,
    validate(['extraction', DboResellExtraction.isEntity]),
    ExtractionController.add,
);

// Update one
extractionRouter.put(
    Paths.Resell.Transaction.Update,
    validate(['extraction', DboResellExtraction.isEntity]),
    ExtractionController.update,
);

// Delete one
extractionRouter.delete(
    Paths.Resell.Transaction.Delete,
    validate(['id', 'number', 'params']),
    ExtractionController.delete,
);

export default extractionRouter;