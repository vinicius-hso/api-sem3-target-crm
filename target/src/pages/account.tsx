import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import UserAccountComponent from '../ui/components/UserAccountComponent/UserAccountComponent';
import { useSessionUserPage } from "data/services/hooks/PageHooks/SessionUserHook";
import Alert from '../ui/components/AlertComponent/AlertComponent';

function Home() {

  const [hasEdit, setHasEdit] = useState(false);
  const [hasEditPassword, setHasEditPassword] = useState(false);
  const { user, editUser, editUserPassword } = useSessionUserPage();
  
  const [status, setStatus] = useState<{status: string, message: string}>({
    status: '',
    message: ''
  });

  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    picture: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  })

  useEffect(() => {
    setData({...user});
  }, [user]);

  return (
    <div>
      {status.status ? (
            <Alert severity={status.status} message={status.message} />
          ) : null}
      <Container>
        {data ? <UserAccountComponent 
          user={data}
          setUser={(user) => setData(user)}
          onClick={() => setHasEdit(!hasEdit)}
          hasEdit={hasEdit}
          saveEdit={async (data) => {
            setHasEdit(false);
            setStatus(await editUser(data.id, data));
            
            setTimeout(() => {
              setStatus({
                status: '',
                message: ''
              })
            }, 3000)
          }}
          password={passwords}
          setUserPassword={(passwords) => setPasswords(passwords)}
          onClickPassword={() => setHasEditPassword(!hasEditPassword)}
          hasEditPassword={hasEditPassword}
          saveEditPassword={async (passwords) => {
            setHasEditPassword(false);
            setStatus(await editUserPassword(data.id, passwords));
            setPasswords({
              oldPassword: '',
              newPassword: ''
            })

            setTimeout(() => {
              setStatus({
                status: '',
                message: ''
              })
            }, 3000)
          }}
        />
       : <div></div>}
      </Container>
        
    </div>
  );
}
export default Home;
