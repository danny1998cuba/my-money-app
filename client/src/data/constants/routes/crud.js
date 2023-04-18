export const CRUD_ROOTS = {
    details: '',
    create: 'create',
    update: 'update',
    delete: 'delete',
}

const CRUD_ROUTES = {
    details: ':id',
    create: `${CRUD_ROOTS.create}`,
    update: `${CRUD_ROOTS.update}/:id`,
    delete: `${CRUD_ROOTS.delete}/:id`,
}

export default CRUD_ROUTES;