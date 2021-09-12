export default interface ModalTypes {
  updateModalState: boolean;
  useUpdateModal: () => void;
  deleteModalState: boolean;
  useDeleteModal: () => void;
  deletePipeline: () => void;
  updatePipeline: () => void;
  setUpdateId: (id: string) => void;
  setName: (name: string) => void;
  setDeleteId: (id: string) => void;
}
