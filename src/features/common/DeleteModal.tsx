import { Text, Button } from "@/ui";
import Modal, { ModalProps } from "@/ui/layout/Modal";
import React from "react";

type ButtonTypes = "Done" | "Cancel";

interface DeleteModalProps extends ModalProps {
  headText?: string;
  subText?: string;
  doneText?: string;
  cancelText?: string;
  onButtonClick?: (e?: ButtonTypes) => void;
  isLoading?: boolean;
}

const DeleteModal = (props: DeleteModalProps) => {
  const {
    visible,
    onHide,
    doneText = "Delete",
    cancelText = "Cancel",
    title,
    headText,
    subText,
    onButtonClick,
    isLoading,
    ...rest
  } = props;

  return (
    <>
      <Modal
        contentClassName="p-4 sm:p-6"
        bodyClassName="!max-w-md"
        title={title}
        visible={visible}
        isCloseVisible={false}
        onHide={onHide}
        {...rest}
      >
        {headText ? (
          <div className="flex gap-2">
            <Text Tag="strong" className="font-bold">
              {headText}
            </Text>
          </div>
        ) : null}
        {subText ? <div className="mt-2 text-sm">{subText}</div> : null}
        <div className="flex flex-col gap-3 sm:flex-row-reverse mt-5 sm:mt-4">
          <Button
            isLoading={isLoading}
            variant="Delete"
            onClick={() => onButtonClick?.("Done")}
          >
            {doneText}
          </Button>
          <Button variant="Secondary" onClick={() => onButtonClick?.("Cancel")}>
            {cancelText}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
