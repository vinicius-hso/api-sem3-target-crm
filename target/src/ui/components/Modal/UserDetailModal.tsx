import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { IUser } from "types/User";
import UserDetailCard from "../UserDetailCard/UserDetailCard";
import { useUserPage } from "../../../data/services/hooks/PageHooks/UserHook";
import { useEffect } from "react";
import { Button } from '@material-ui/core';

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
    userDetail,
    editUser,
    deleteUser,
    // useUpdateCompanyModal,
    // company
  } = useUserPage();

  const [hasEdit, setHasEdit] = useState(false);

  /**
   * TODO - useEditCompanyModal, companyDetailCard
   */

  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    role: "",
    picture: "",
  });

  const handleSubmitEdit = (data) => {
    editUser(userDetail.id, data);
    setHasEdit(false);
  };

  const handleDeleteUser = () => {
    const id = user.id
    deleteUser(id).then(() => {
      window.location.reload()
    });
  };

  // function handleSubmit() {
  //   console.log("Aoobah!");
  // }


  const body = (
    <ModalContainer>
      {user.id ? (
      <>
        <CloseButtonStyled
          onClick={() => {
            // console.log('>>>>');
            // useCompanyDetailModal(companyDetail)
            setOpen(false);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>

        <Title title={`Detalhes do usuario ${user?.name}`} />

        <UserDetailCard
          onClick={() => setHasEdit(!hasEdit)}
          hasEdit={hasEdit}
          id={user.id}
          name={user?.name}
          email={user?.email}
          role={user?.role}
          picture={user?.picture}
          saveEdit={(data) => {
            setData(data);
            handleSubmitEdit(data);
          }}
        />
        <Button
          onClick={() => {
            // updateStatus(dealDetail.id, { status: "ARCHIVED" });
            // setHasStatusChange(false);
            handleDeleteUser()
            // window.location.reload();
          }}
          variant="contained"
          size="small"
          sx={{
            width: "160px",
            mb: 2,
          }}
          color="secondary"
          type="submit"
        >
          Deletar
        </Button>
      </>
       ) : (
         <div>Não foi possivel carregar dados, atualize a pagina</div>
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
