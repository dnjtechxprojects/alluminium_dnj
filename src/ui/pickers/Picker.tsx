import { useRef } from "react";

// UI IMPORT

// THIRD - PARTY IMPORT
// import dummyImage from "../../assets/images/dummy-image.svg";
import { IconKey } from "../icons";

export interface PickerProps {
  className?: string;
  inputClassName?: string;
  lableClassName?: string;
  name: string;
  label?: string;
  value?: any;
  icon?: IconKey;
  msg?: string;
  rightIcon?: IconKey;
  placeholder?: string;
  errors?: any;
  register?: any;
  disabled?: any;
  style?: any;
  accept?: string;
  maxSize?: number;
  selectionLimit?: number;
  onChange?: (value?: any) => void;
  setIsImageChange?: any;
  setImages?: any;
  images?: any;
}
const Picker = (props: PickerProps) => {
  const {
    className = "",
    inputClassName = "",
    accept = "image/*",
    value,
    label,
    icon,
    rightIcon,
    errors,
    register,
    name,
    selectionLimit = 5,
    setImages,
    onChange,
    images = [],
    disabled,
    ...rest
  } = props;

  const ref = useRef<any>(null);

  const getRegister = (register: any) =>
    register && name ? { ...register?.(name) } : {};

  const message = errors?.[name]?.message || "";

  const handleRemoveImage = (e: any, index: number) => {
    e.stopPropagation();
    const newValue = [...value];
    const newValue1 = [...images];
    newValue.splice(index, 1);
    newValue1.splice(index, 1);
    onChange?.(newValue);
    setImages(newValue1);
  };

  return (
    <div className={`${className} proof-sec`}>
      <label className={`text-sm text-ev-secondary pb-[4px]`}>
        {label + ` (upto ${selectionLimit})`}
      </label>
      <div className="file-input">
        <input
          ref={ref}
          name={name}
          multiple
          type="file"
          className={`${inputClassName} ${
            message ? "border-red-500" : ""
          } documents-input__input`}
          accept={accept}
          disabled={disabled}
          onChange={(e: any) => {
            try {
              const selectedFiles = Array.from(e.target.files || []).slice(
                0,
                selectionLimit - value?.length
              );
              const imageFiles: any[] = [];
              const imageObjects: any[] = [];

              if (!selectedFiles?.length) {
                onChange?.([]);
                setImages?.([]);
                return;
              }

              selectedFiles.forEach((file: any) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const image = new Image();
                  image.src = e.target?.result as string;
                  image.onload = () => {
                    imageObjects.push({
                      file: file,
                      liveImage: file ? URL.createObjectURL(file) : "",
                    });
                    imageFiles.push(URL.createObjectURL(file));
                    if (imageObjects.length === selectedFiles.length) {
                      onChange?.([...value, ...imageObjects]);
                      setImages?.([...images, ...imageFiles]);
                    }
                  };
                };
                reader.readAsDataURL(file);
              });
              setImages(imageFiles);
              e.target.value = null;
            } catch (err) {
              console.error("Upload Image =-=>", err);
            }
          }}
          {...getRegister(register)}
          {...rest}
        />
        <div className="flex flex-wrap">
          {images?.length
            ? images?.map((image: any, index: any) => (
                <div className="relative" key={index}>
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    className="rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "10px",
                    }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      // e.target.src = dummyImage;
                      e.target.width = 40;
                      e.target.height = 40;
                    }}
                  />
                  {/* {!disabled ? (
                    <IoMdCloseCircle
                      color="#ffb24a"
                      className="cursor-pointer absolute top-0 right-0"
                      onClick={(e) => handleRemoveImage(e, index)}
                    />
                  ) : null} */}
                </div>
              ))
            : null}
          {images?.length < selectionLimit && !disabled ? (
            <label
              className="file-input__label mt-1"
              htmlFor="file-input"
              style={{
                border: message ? "1px solid rgba(239, 68, 68, 1)" : "",
              }}
              onClick={(e) => {
                if (value?.liveImage) {
                  e.stopPropagation();
                  e.preventDefault();
                } else {
                  ref.current.click();
                }
              }}
            >
              <span className="font-semibold pt-2 text-[#ffb24a] text-xs">
                Click to Upload
                {/* <RiUploadCloud2Line className="w-10 h-10 m-auto" /> */}
              </span>
            </label>
          ) : null}
        </div>
        {message ? (
          <span className="text-red-500 text-sm">{message}</span>
        ) : null}
      </div>
    </div>
  );
};

export default Picker;
