import { Router } from 'express';

import Paths from './constants/Paths';
import userRouter from './routers/UserRouter';
import currencyRouter from './routers/CurrencyRouter';
import resellRouter from './routers/ResellRouter';


// **** Variables **** //

const apiRouter = Router();


// ** Add Routers ** //

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// Add CurrencyRouter
apiRouter.use(Paths.Currency.Base, currencyRouter);

// Add ResellRouter
apiRouter.use(Paths.Resell.Base, resellRouter);



// **** Export default **** //

export default apiRouter;
