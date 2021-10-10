import React, { useContext } from "react";
import AuthContext from '../../../../contexts/AuthContext';
import UserService from 'data/services/UserService';

export const useSessionUserPage = () => {

    const { user } = useContext(AuthContext);
    
    const editUser = async (userId: any, data: any) => {
        const res = await UserService.editUser(userId, data);
        if (res.status === 'success') {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return res;
      };

    const editUserPassword = async (userId: any, data: any) => {
        const res = await UserService.editUserPassword(userId, data);
        return res;
    }
    
    return {
        user,
        editUser,
        editUserPassword
    }
}