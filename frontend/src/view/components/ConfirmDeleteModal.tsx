import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  title,
  description,
  onConfirm,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal onClose={onClose} open title="Excluir">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          {title}
        </p>
        {description && (
          <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          onClick={onConfirm}
          isLoading={isLoading}
          className="w-full"
          variant="danger"
        >
          Sim, desejo excluir
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
