import { Router } from 'express';

import Paths from '../constants/Paths';
import depositRouter from './DepositRouter';
import extractionRouter from './ExtractionRouter';
import transactionRouter from './TransactionRouter';


// **** Variables **** //
const resellRouter = Router();

// ** Add Routers ** //

// Add UserRouter
resellRouter.use(Paths.Resell.Deposit.Base, depositRouter);

// Add CurrencyRouter
resellRouter.use(Paths.Resell.Extraction.Base, extractionRouter);

// Add CurrencyRouter
resellRouter.use(Paths.Resell.Transaction.Base, transactionRouter);

// **** Export default **** //

export default resellRouter;
