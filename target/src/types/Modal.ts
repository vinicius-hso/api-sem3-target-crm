export default interface ModalTypes {
  createModalState: boolean;
  useCreateModal: () => void;
  updateModalState: boolean;
  useUpdateModal: (id: string) => void;
  deleteModalState: boolean;
  useDeleteModal: (id: string) => void;
  deletePipeline: () => void;
  createPipeline: () => void;
  updatePipeline: () => void;
  setName: (name: string) => void;
}
