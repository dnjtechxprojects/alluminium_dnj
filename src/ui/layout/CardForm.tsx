import { useRouter } from "next/navigation";

// UI IMPORT
import Text from "../typography/Text";
import { Button } from "../buttons";
import { Icon } from "../icons";

// TYPES
interface CardFormProps {
    className?: string;
    bodyClassName?: string;
    children: React.ReactNode;
    title: string;
    cancelText?: string;
    doneText?: string;
    isLoading?: boolean;
    disabled?:boolean;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancelClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CardForm = (props: CardFormProps) => {
    const {
        className = "",
        bodyClassName = "",
        children,
        title,
        cancelText = "Cancel",
        doneText = "Save Changes",
        isLoading,
        disabled,
        handleSubmit,
        onCancelClick,
    } = props;

    const router = useRouter();

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className={`${className} z-[1] relative flex flex-col bg-white rounded-md h-[calc(100vh-123px)] tsm:h-[calc(100vh-183px)] shadow-lg shadow-primary-200 dark:shadow-primary-700`}
        >
            <div className="flex items-center gap-3 bg-primary-800 border border-txt dark:border-opacity-40 rounded-t-md justify-start px-8 py-3 tsm:px-4">
                <Icon
                    name="Back"
                    className="stroke-white"
                    onClick={() => {
                        router.back();
                    }}
                />
                <Text className="text-sm !text-primary-100 hover:!text-secondary-400 cursor-pointer">
                    {title}
                </Text>
            </div>
            <div
                className={`px-11 tsm:px-4 h-full overflow-y-scroll dark:bg-primary-800 border border-txt dark:border-opacity-40 py-4 `}
            >
                <div
                    className={`${bodyClassName} grid grid-cols-3 tsm:grid-cols-1 tmd:grid-cols-2 gap-x-4 gap-y-6`}
                >
                    {children}
                </div>
            </div>
            {onCancelClick || handleSubmit ? (
                <div className="flex justify-end items-center dark:bg-primary-800 rounded-b-md px-10 tsm:px-4 py-3 border border-txt dark:border-opacity-40 shadow-box dark:shadow-box-dark">
                    <div className="flex gap-4">
                        {onCancelClick ? (
                            <Button onClick={onCancelClick}>{cancelText}</Button>
                        ) : null}
                        {handleSubmit && !disabled ? <Button type="submit" isLoading={!!isLoading}>{doneText}</Button> : null}
                    </div>
                </div>
            ) : null}
        </form>
    );
};

export default CardForm;
