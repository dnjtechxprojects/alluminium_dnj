import { Button } from "@/ui";
import Modal, { ModalProps } from "@/ui/layout/Modal";
import { useAuth } from "@/context/useAuth";

interface LogoutModalProps extends ModalProps {}

const LogoutModal = (props: LogoutModalProps) => {
  const { visible, onHide, title, ...rest } = props;

  const { onLogout, isLoading } = useAuth();

  return (
    <>
      <Modal
        bodyClassName="!max-w-md"
        title={"Are you sure you want to Log out ? "}
        visible={visible}
        onHide={onHide}
        {...rest}
      >
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 ">
          <div className="flex flex-col gap-3 sm:flex-row-reverse mt-1">
            <Button
              isLoading={isLoading}
              variant="Primary"
              onClick={() => {
                onLogout();
              }}
            >
              Logout
            </Button>
            <Button onClick={onHide}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
