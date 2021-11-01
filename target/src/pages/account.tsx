import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import UserAccountComponent from "../ui/components/UserAccountComponent/UserAccountComponent";
import { useSessionUserPage } from "data/services/hooks/PageHooks/SessionUserHook";
import Alert from "../ui/components/AlertComponent/AlertComponent";
import { IUser } from "types/User";

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function Home() {
  const [hasEdit, setHasEdit] = useState(false);
  const [hasEditPassword, setHasEditPassword] = useState(false);
  const { user, editUser, editUserPassword } = useSessionUserPage();

  const [status, setStatus] = useState<{ status: string; message: string }>({
    status: "",
    message: "",
  });

  const [data, setData] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    picture: "",
  });

  const [passwords, setPasswords] = useState<Passwords>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setData({ ...user });
  }, [user]);

  function checkPasswords() {
    return (
      passwords.newPassword === passwords.confirmNewPassword &&
      passwords.confirmNewPassword.length > 0
    );
  }

  return (
    <div>
      {status.status && (
        <Alert
          title="Passwords"
          severity={status.status}
          message={status.message}
        />
      )}
      <Container>
        {data && (
          <UserAccountComponent
            user={data}
            setUser={(user) => setData(user)}
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            saveEdit={async (data) => {
              setHasEdit(false);
              setStatus(await editUser(data.id, data));

              setTimeout(() => {
                setStatus({
                  status: "",
                  message: "",
                });
              }, 3000);
            }}
            password={passwords}
            setUserPassword={(passwords) => setPasswords(passwords)}
            onClickPassword={() => setHasEditPassword(!hasEditPassword)}
            hasEditPassword={hasEditPassword}
            saveEditPassword={async (passwords) => {
              if (passwords.newPassword !== passwords.confirmNewPassword) {
                setHasEditPassword(false);
                setStatus(await editUserPassword("", ""));
                setTimeout(() => {
                  setStatus({
                    status: "",
                    message: "",
                  });
                }, 3000);
                return null;
              } else {
                checkPasswords();
                setHasEditPassword(false);
                setStatus(await editUserPassword(data.id, passwords));
                setPasswords({
                  oldPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                });
                setTimeout(() => {
                  setStatus({
                    status: "",
                    message: "",
                  });
                }, 3000);
              }
            }}
          />
        )}
      </Container>
    </div>
  );
}
export default Home;
