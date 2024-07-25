import React, { use, useEffect, useMemo } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

interface FormModalProps {
  initialValues: any;
  onCloseEvent: () => void;
  onSubmit: (values, actions) => void;
  title: string;
  confirmText: string;
  cancelText: string;
  wakeupFormModal: (wakeupFunction: () => void) => void;
  children?: React.ReactNode;
}

const FormModal = ({
  initialValues,
  onCloseEvent,
  onSubmit,
  title,
  confirmText,
  cancelText,
  wakeupFormModal,
  children,
}: FormModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * @description Convert camelCase to label and first letter uppercase
   * @param camelCase
   * @returns
   */
  const camelToLabel = (camelCase: string) => {
    return camelCase
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const maxFieldLabelWith = useMemo(() => {
    const maxFiledLabelLength = Object.keys(initialValues).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0,
    );
    const measerdWidth = maxFiledLabelLength * 18;
    return measerdWidth;
  }, [initialValues]);

  useEffect(() => {
    wakeupFormModal(onOpen);
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        onCloseEvent();
      }}
    >
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          await onSubmit(values, actions);
          actions.setSubmitting(false);
          onClose();
        }}
      >
        {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              {children && children}
              <ModalBody>
                <Container display={'flex'} flexDirection={'column'} rowGap={2}>
                  {Object.keys(initialValues).map((key, index) => (
                    <Field key={`field-${index}-${key}`} name={key}>
                      {({ field, form }) => (
                        <FormControl display={'flex'} flexDirection={'column'}>
                          <FormLabel htmlFor={key}>
                            {camelToLabel(key)}
                          </FormLabel>
                          <Input
                            {...field}
                            id={key}
                            onChange={props.handleChange}
                          />
                          <FormErrorMessage>
                            {form.errors[key]}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  ))}
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => {
                    onClose();
                    onCloseEvent();
                  }}
                >
                  {cancelText}
                </Button>
                <Button type="submit" isLoading={props.isSubmitting}>
                  {confirmText}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FormModal;
