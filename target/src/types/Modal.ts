export default interface ModalTypes {
  createModalState: boolean;
  useCreateModal: () => void;
  updateModalState: boolean;
  useUpdateModal: () => void;
  deleteModalState: boolean;
  useDeleteModal: () => void;
}
