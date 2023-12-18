import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const Modal = ({
  children,
  trigger,
  onOpenAutoFocus,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  trigger: ReactNode;
  onOpenAutoFocus?: () => void;
  open?: boolean | undefined;
  onOpenChange?: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button>{trigger}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={clsx("bg-gray-900 opacity-40 dark:opacity-80 fixed inset-0")} />
        <Dialog.Content
          onOpenAutoFocus={onOpenAutoFocus}
          className={clsx(
            "bg-sand-200",
            "rounded-lg pt-8 pb-0 shadow-md shadow-sand-500",
            "fixed top-[5vw] left-[5vw] sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%]",
            "max-h-[90vh] w-[min(90vw,_40rem)]",
            "p-3"
          )}
        >
          {children}
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3" aria-label="Close">
              <XMarkIcon className="text-black hover:text-red-600 h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
