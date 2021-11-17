import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import UserAccountComponent from "../ui/components/UserAccountComponent/UserAccountComponent";
import { useSessionUserPage } from "data/services/hooks/PageHooks/SessionUserHook";
import { IUser } from "types/User";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function Account() {
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
      <Head>
        <title>Minha conta | Target</title>
      </Head>
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
export default Account;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";

  Object.keys(data).find((key, i) => {
    if (key === "@target:user") {
      token = Object.values(data)[i];
    }
  });
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check");
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      session: "",
    },
  };
};
