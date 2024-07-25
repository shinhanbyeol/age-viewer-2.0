import React, { useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

const AlertDialogBox = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  wakeupAlertDialog,
}: {
  title: string | undefined;
  message: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string | undefined;
  cancelText: string | undefined;
  wakeupAlertDialog: (wakeupFunction: () => void) => void;
}) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    wakeupAlertDialog(onOpen);
  }, []);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onCancel();
                  onClose();
                }}
              >
                {cancelText}
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                {confirmText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogBox;
