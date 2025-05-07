import { createPortal } from "react-dom";
import { Input } from "../common/Input";
import classes from "./ProductForm.module.css";
import { useImperativeHandle, useRef, forwardRef } from "react";

const TITLE_OPTIONS = [
  { value: "1", label: "Arena 4.5kg" },
  { value: "2", label: "Arena 10kg" },
  { value: "3", label: "Arena 25kg" },
];

const AROMA_OPTIONS = [
  { value: "1", label: "Aroma 1" },
  { value: "2", label: "Aroma 2" },
  { value: "3", label: "Aroma 3" },
];

const CHECKBOX_OPTIONS = [
  { value: "1", label: "4.5kg" },
  { value: "2", label: "10kg" },
  { value: "3", label: "25kg" },
];

export interface ProductFormRef {
  open: () => void;
  close: () => void;
}

export const ProductForm = forwardRef<ProductFormRef>((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    dialog.current?.close();
    document.body.classList.remove("no-scroll");
  };

  const handleOpen = () => {
    dialog.current?.showModal();
    document.body.classList.add("no-scroll");
  };

  useImperativeHandle(ref, () => ({
    open() {
      handleOpen();
    },
    close() {
      handleClose();
    },
  }));

  return createPortal(
    <dialog
      className={classes.modal}
      ref={dialog}
      onClick={handleBackdropClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes["modal__content"]}
      >
        <div className={classes["modal__header"]}>
          <h1>Agrega un producto</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
            className={classes["x-icon"]}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
        <form className={classes["modal__form"]}>
          <Input
            label="Título del producto"
            name="title"
            select
            options={TITLE_OPTIONS}
          />
          <Input label="Descripción" name="description" textarea />
          <Input label="Aroma" name="aroma" select options={AROMA_OPTIONS} />
          <Input label="Precio" name="price" type="number" />
          <Input label="Stock" name="stock" type="number" />
          <Input
            label="Imagen"
            name="image"
            placeholder="Agrega el link de la imagen"
          />
          <Input
            label="Available weights"
            name="stock"
            checkbox
            checkboxOptions={CHECKBOX_OPTIONS}
          />
        </form>
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
});
