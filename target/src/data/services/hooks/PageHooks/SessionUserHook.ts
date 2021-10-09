import React, { useContext, useEffect, useState } from "react";
import { IUser } from "types/User";
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
    
    return {
        user,
        editUser
    }
}