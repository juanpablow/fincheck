import { cn } from "@app/utils/cn";
import * as RdxDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  onClose(): void;
}

export function Modal({
  children,
  open,
  title,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Trigger></RdxDialog.Trigger>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-[3px] z-50",
            "data-[state=open]:animate-overlay-show"
          )}
        />
        <RdxDialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none",
            "data-[state=open]:animate-content-show"
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button className="w-12 h-12 flex items-center justify-center outline-none">
              <Cross2Icon onClick={onClose} className="w-6 h-6" />
            </button>
            <RdxDialog.Title className="text-lg tracking-[-1px] font-bold">
              {title}
            </RdxDialog.Title>

            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>
          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
