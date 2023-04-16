import MAIN_ROUTES from "../routes/main";

export const RESELL_MENU = [
    {
        key: 'base_00',
        text: 'Resell Base',
        href: `/${MAIN_ROUTES.resell}`,
        isEnd: true
    },
    {
        key: 'transaction_00',
        text: 'Transaction',
        href: 'transaction',
        isEnd: false
    },
    {
        key: 'operations_00',
        text: 'Operations',
        href: 'operation',
        isEnd: true
    },
]