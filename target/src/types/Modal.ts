export default interface ModalTypes {
  updateModalState: boolean;
  useUpdateModal: () => void;
  deleteModalState: boolean;
  useDeleteModal: () => void;
  createModalState: boolean;
  useCreateModal: () => void;
}
