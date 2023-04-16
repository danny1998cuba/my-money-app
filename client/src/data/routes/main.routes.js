import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../../layout'
import { ResellRoutes } from './resell.routes'
import { MAIN_ROUTES } from '../constants'

export const MainRoutes = () => {
    return (
        <Routes>
            <Route key='main' path={`/${MAIN_ROUTES.dashboard}`} element={<MainLayout title=''/>} />
            <Route key='resell' path={`/${MAIN_ROUTES.resell}`} element={<MainLayout title='Resell'/>} children={ResellRoutes()} />
            <Route key='error' path="*" element={<Navigate to={`/${MAIN_ROUTES.not_found}`} replace={true} />} />
        </Routes>
    )
}
