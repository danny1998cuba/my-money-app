import CRUD_ROUTES from "./crud"

export const RESELL_BASE = 'resell'

export const RESELL_ROOTS = {
    transaction: 'transaction',
    deposit: 'deposit',
    extraction: 'extraction'
}

export const RESELL_TRANSACTION = {
    begin: `${RESELL_ROOTS.transaction}/${CRUD_ROUTES.create}`,
    update: `${RESELL_ROOTS.transaction}/${CRUD_ROUTES.update}`,
    delete: `${RESELL_ROOTS.transaction}/${CRUD_ROUTES.delete}`,
    one: `${RESELL_ROOTS.transaction}/${CRUD_ROUTES.details}`,
}

export const RESELL_DEPOSIT = {
    base: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.deposit}`,
    one: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.deposit}/${CRUD_ROUTES.details}`,
}

export const RESELL_EXTRACTION = {
    base: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.extraction}`,
    begin: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.extraction}/${CRUD_ROUTES.create}`,
    update: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.extraction}/${CRUD_ROUTES.update}`,
    delete: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.extraction}/${CRUD_ROUTES.delete}`,
    one: `${RESELL_TRANSACTION.one}/${RESELL_ROOTS.extraction}/${CRUD_ROUTES.details}`,
}
