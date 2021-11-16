import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { IUser } from "types/User";
import UserDetailCard from "../UserDetailCard/UserDetailCard";
import { useUserPage } from "../../../data/services/hooks/PageHooks/UserHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../Dialog/Dialog";
// import Alert from "../AlertComponent/AlertComponent";

interface UserDetailModalProps {
  open: boolean;
  user: any;
  setOpen: any;
  getData: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  open,
  user,
  setOpen,
  getData,
}) => {
  const { editUser, deleteUser } = useUserPage();

  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);
  /**
   * TODO - useEditCompanyModal, companyDetailCard
   */

  const handleSubmitEdit = async (data: IUser) => {
    await editUser(user.id, data);
    onClose();
    getData();
  };

  const onClose = () => {
    setHasEdit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={"Atualizar status"}
        message={`Tem certeza que deseja deletar ${user.name}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteUser(user.id);
            getData();
            onClose();
          }
        }}
      />

      {user.id ? (
        <>
          <Tooltip
            title="Fechar"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <CloseButtonStyled
              onClick={() => {
                onClose();
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
                  setDialogView(true);
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
          onClose();
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
