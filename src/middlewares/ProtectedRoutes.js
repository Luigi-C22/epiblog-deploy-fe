import React, { useEffect } from 'react';
import jwtdecode from 'jwt-decode';
import Login from "../pages/Login";
import { Outlet, useNavigate } from 'react-router-dom';

//controlla nel Local Storage che ci sia un utente (booleano)
const auth = () => {
    return JSON.parse(localStorage.getItem('userLoggedIn')) || false;
};

// custom hook che controlla la sessione
// decodifica la sessione
export const useSession = () => {
    const session = auth();
    const decodedSession = session ? jwtdecode(session) : null; // ritorna l'oggetto contenente l'utente (in chiaro)

    const navigate = useNavigate(); //lo useNavigate consente di inviare l'utente da qualche parte

   useEffect(() => {
        if (!session) {
            navigate('/', { replace: true }); //il "replace: true" invalida la browser history
        } 
    }, [navigate, session]);
 
    //ritorna l'oggetto decodificato
    return decodedSession;
};

const ProtectedRoutes = () => {
    const isAuthorized = auth();
    const session = useSession();

    return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;