import { Container } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import UserAccountComponent from '../ui/components/UserAccountComponent/UserAccountComponent';
import AuthContext from "contexts/AuthContext";
import { useSessionUserPage } from "data/services/hooks/PageHooks/SessionUserHook";
import Alert from '../ui/components/AlertComponent/AlertComponent';

//AINDA N ESTA EM USO... APENAS PARA TESTE DE LAYOUT
function Home() {

  const [hasEdit, setHasEdit] = useState(false);
  const { user, editUser } = useSessionUserPage();
  
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

  useEffect(() => {
    setData({...user});
  }, [user]);

  ;
  
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
            setHasEdit(false)
            setStatus(await editUser(data.id, data))
            
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
