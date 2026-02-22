import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface ConfirmDeleteProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onDelete: () => void;
}

const ConfirmDeleteModal = ({ isModalOpen, setIsModalOpen, onDelete }: ConfirmDeleteProps) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      title="Delete Confirmation"
      size="lg"
      closeOnOverlayClick={true}
      showCloseButton={true}>
      <div className="space-y-6">
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsModalOpen(false);
            }}>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
