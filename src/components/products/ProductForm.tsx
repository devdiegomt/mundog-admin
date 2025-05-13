import { createPortal } from "react-dom";
import { Input } from "../common/Input";
import classes from "./ProductForm.module.css";
import {
  useImperativeHandle,
  useRef,
  forwardRef,
  /* useEffect, */
  useState,
} from "react";
import { Form, useActionData } from "react-router-dom";
import type { Product } from "../../types/product";
import images from "../../data/images";

const TITLE_OPTIONS = [
  { value: "1", label: "Arena Calabaza" },
  { value: "2", label: "Snack Calabaza" },
  /* { value: "3", label: "Arena Calabaza" }, */
];

/* const AROMA_OPTIONS = [
  { value: "1", label: "Vainilla" },
  { value: "2", label: "Rosa" },
  { value: "3", label: "Manzana" },
  { value: "4", label: "Café" },
  { value: "5", label: "Lavanda" },
  { value: "6", label: "Talco de bebé" },
];
 */
const CHECKBOX_OPTIONS = [
  { value: "1", label: "4.5kg" },
  { value: "2", label: "10kg" },
  { value: "3", label: "25kg" },
];

export interface ProductFormRef {
  open: () => void;
  close: () => void;
}

interface ImageData {
  src: string;
  alt: string;
}

export const ProductForm = forwardRef<ProductFormRef, Product.ProductState>(
  ({ productToEdit }, ref) => {
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

    const isEditing = !!productToEdit;
    const data = useActionData();
    const dialog = useRef<HTMLDialogElement>(null);

    const handleBackdropClick = (
      event: React.MouseEvent<HTMLDialogElement>
    ) => {
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

    /* useEffect(() => {
      if (data?.success) {
        handleClose();
        location.reload();
      }
    }, [data]); */

    const handleSelectImage = (image: ImageData): void => {
      setSelectedImage(image);
    };

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
            <h1>{isEditing ? "Editar producto" : "Agrega un producto"}</h1>
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
          <Form
            method="post"
            action={isEditing ? `/${productToEdit?._id}` : "/"}
            className={classes["modal__form"]}
          >
            <Input
              label="Título del producto"
              name="title"
              select
              options={TITLE_OPTIONS}
              defaultValue={productToEdit?.title}
              required
            />
            <Input
              label="Descripción"
              name="description"
              textarea
              defaultValue={productToEdit?.description}
              required
            />
            {/*             <Input
              label="Aroma"
              name="aroma"
              select
              options={AROMA_OPTIONS}
              defaultValue={productToEdit?.aroma}
              required
            /> */}
            <Input
              label="Precio"
              name="price"
              type="number"
              defaultValue={productToEdit?.price}
              required
            />
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              defaultValue={productToEdit?.quantity}
              required
            />
            <label>Aroma / Snack</label>
            <ul className={classes["new-product__images"]}>
              {images.map((image) => (
                <li
                  key={image.src}
                  onClick={() => handleSelectImage(image)}
                  className={
                    selectedImage === image ? classes.selected : undefined
                  }
                >
                  <img {...image} />
                  <p className={classes["new-product__images--alt"]}>
                    {image.alt}
                  </p>
                </li>
              ))}
            </ul>
            <input
              type="hidden"
              name="aroma"
              value={selectedImage?.alt ?? ""}
              defaultValue={productToEdit?.aroma}
              required
            />
            <input
              type="hidden"
              name="image"
              value={selectedImage?.src ?? ""}
              defaultValue={productToEdit?.image}
              required
            />
            <input
              type="hidden"
              name="_method"
              value={isEditing ? "put" : "post"}
            />
            <Input
              label="Available weights"
              name="weights"
              checkbox
              checkboxOptions={CHECKBOX_OPTIONS}
              defaultValue={productToEdit?.weights}
            />
            <button type="submit" className={classes["modal__btn"]}>
              Guardar
            </button>
          </Form>
          {data?.error && <p>{data.error}</p>}
        </div>
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
