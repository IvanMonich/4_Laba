import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import AuthPage from "./pages/AuthPage/AuthPage";
import FinancePage from "./pages/FininsPage/FinancePage";

const useRoutes = (isAuthenticated, userId) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<FinancePage userID={userId}/>}/>
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />}/>
        </Routes>
    );
};

export default useRoutes;