import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { IUser } from "types/User";
import UserDetailCard from "../UserDetailCard/UserDetailCard";
import { useUserPage } from "../../../data/services/hooks/PageHooks/UserHook";
import { Button, Tooltip } from "@material-ui/core";
// import Alert from "../AlertComponent/AlertComponent";

interface UserDetailModalProps {
  open: boolean;
  user: any;
  setOpen: any;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  open,
  user,
  setOpen,
}) => {
  const {
    editUser,
    deleteUser,
    // useUpdateCompanyModal,
  } = useUserPage();

  const [hasEdit, setHasEdit] = useState(false);

  const [status, setStatus] = useState<{ status: string; message: string }>({
    status: "",
    message: "",
  });

  /**
   * TODO - useEditCompanyModal, companyDetailCard
   */

  const handleSubmitEdit = async (data: IUser) => {
    const res = await editUser(user.id, data);
    setStatus(res);
    setTimeout(() => {
      setStatus({ status: "", message: "" });
    }, 3000);
    //setHasEdit(false);
  };

  const handleDeleteUser = () => {
    const id = user.id;
    deleteUser(id).then(() => {
      setOpen(false);
      window.location.reload();
    });
  };

  // function handleSubmit() {
  //   console.log("Aoobah!");
  // }

  const body = (
    <ModalContainer>
      {user.id ? (
        <>
          {status.status ? (
            <Alert severity={status.status} message={status.message} />
          ) : null}
          <Tooltip
            title="Fechar"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <CloseButtonStyled
              onClick={() => {
                setOpen(false);
                window.location.reload();
              }}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </CloseButtonStyled>
          </Tooltip>

          <Title title={`Detalhes do usuário ${user?.name}`} />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Tooltip
              title="Deletar usuário"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                onClick={() => {
                  handleDeleteUser();
                }}
                variant="contained"
                size="small"
                sx={{
                  width: "160px",
                  mb: 2,
                }}
                color="error"
                type="submit"
              >
                Deletar
              </Button>
            </Tooltip>
          </div>

          <UserDetailCard
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            id={user.id}
            name={user?.name}
            email={user?.email}
            role={user?.role}
            picture={user?.picture}
            saveEdit={(data: IUser) => {
              handleSubmitEdit(data);
            }}
          />
        </>
      ) : (
        <div>Não foi possivel carregar os dados, atualize a página</div>
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default UserDetailModal;
