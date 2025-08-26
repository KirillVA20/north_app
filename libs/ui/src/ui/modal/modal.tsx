import { ReactNode } from 'react';
import { Dialog, Button, Portal } from '@chakra-ui/react';

export type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  /** Pass-through props for Dialog.Content to customize size/variants */
  contentProps?: Parameters<typeof Dialog.Content>[0];
  /** When true (default), uses Portal with Backdrop + Positioner */
  usePortal?: boolean;
};

export function Modal({
  open,
  onOpenChange,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
  contentProps,
  usePortal = true,
}: ModalProps) {
  const content = (
    <Dialog.Content {...contentProps}>
      {title || showCloseButton ? (
        <Dialog.Header>
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}
          {showCloseButton ? (
            <Dialog.CloseTrigger asChild>
              <Button variant="ghost" size="sm">
                ×
              </Button>
            </Dialog.CloseTrigger>
          ) : null}
        </Dialog.Header>
      ) : null}
      <Dialog.Body>{children}</Dialog.Body>
      {footer ? <Dialog.Footer>{footer}</Dialog.Footer> : null}
    </Dialog.Content>
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        onOpenChange?.(e.open);
        if (!e.open) onClose?.();
      }}
    >
      {usePortal ? (
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>{content}</Dialog.Positioner>
        </Portal>
      ) : (
        content
      )}
    </Dialog.Root>
  );
}

export default Modal;
