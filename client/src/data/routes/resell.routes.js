import React from 'react';
import { Route } from "react-router-dom"
import { ModuleLayout } from '../../modules/layout'
import { MENUS, RESELL_ROUTES } from '../constants'
import { Loader } from '../../components/Loader/Loader';

import * as ResellPages from '../../modules/resell/pages'

// import * as RESELL_PAGES from '../../modules/resell/pages'

export const ResellRoutes = () => {
    return [
        <Route key='resell_base' path='' element={<ModuleLayout menus={MENUS.RESELL_MENU} />} children={
            [
                <Route key='base' path='' element={<><Loader /></>} />,
                // Deposit
                <Route key='deposit_base' path={`${RESELL_ROUTES.RESELL_DEPOSIT.base}`} element={<>All Deposits</>} />,
                <Route key='deposit_one' path={`${RESELL_ROUTES.RESELL_DEPOSIT.one}`} element={<>One Deposit</>} />,
                // Extraction
                <Route key='extraction_base' path={`${RESELL_ROUTES.RESELL_EXTRACTION.base}`} element={<>All Extractions</>} />,
                <Route key='extraction_new' path={`${RESELL_ROUTES.RESELL_EXTRACTION.begin}`} element={<>Begin Extraction</>} />,
                <Route key='extraction_up' path={`${RESELL_ROUTES.RESELL_EXTRACTION.update}`} element={<>Update Extraction</>} />,
                <Route key='extraction_del' path={`${RESELL_ROUTES.RESELL_EXTRACTION.delete}`} element={<>Delete Extraction</>} />,
                <Route key='extraction_one' path={`${RESELL_ROUTES.RESELL_EXTRACTION.one}`} element={<>One Extraction</>} />,
                // Transaction
                <Route key='transaction_base' path={`${RESELL_ROUTES.RESELL_ROOTS.transaction}`} element={<ResellPages.TransactionPages.AllTransactions />} />,
                <Route key='transaction_new' path={`${RESELL_ROUTES.RESELL_TRANSACTION.begin}`} element={<>Begin Transaction</>} />,
                <Route key='transaction_up' path={`${RESELL_ROUTES.RESELL_TRANSACTION.update}`} element={<>Update Transaction</>} />,
                <Route key='transaction_del' path={`${RESELL_ROUTES.RESELL_TRANSACTION.delete}`} element={<>Delete Transaction</>} />,
                <Route key='transaction_one' path={`${RESELL_ROUTES.RESELL_TRANSACTION.one}`} element={<>One Transaction</>} />,

            ]
        } />
    ]
}
