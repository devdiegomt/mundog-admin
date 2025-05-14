import { createPortal } from "react-dom";
import { Input } from "../common/Input";
import classes from "./ProductForm.module.css";
import { useImperativeHandle, useRef, forwardRef, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import type { Product } from "../../types/product";
import { images } from "../../data/images";

const TITLE_OPTIONS = [
  { value: "1", label: "Arena Calabaza" },
  { value: "2", label: "Snack Calabaza" },
];

const WEIGHT_OPTIONS = [
  { value: "4.5kg", label: "4.5kg" },
  { value: "10kg", label: "10kg" },
  { value: "25kg", label: "25kg" },
  { value: "15g", label: "15g" },
  { value: "75g", label: "75g" },
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
    const [selectedImages, setSelectedImages] = useState<(ImageData | null)[]>([
      null,
    ]);
    const [presentations, setPresentations] = useState<
      Product.PresentationProps[]
    >([
      {
        weight: "",
        price: 0,
        quantity: 0,
        image: "",
      },
    ]);

    const data = useActionData();
    const dialog = useRef<HTMLDialogElement>(null);
    const isEditing = !!productToEdit;

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

    const handleSelectImage = (index: number, image: ImageData) => {
      setSelectedImages((prev) => {
        const updated = [...prev];
        updated[index] = image;
        return updated;
      });
    };

    const addPresentation = () => {
      setPresentations((prev) => [
        ...prev,
        { weight: "", price: 0, quantity: 0, image: "" },
      ]);

      setSelectedImages((prev) => [...prev, null]);
    };

    const removePresentation = (index: number): void => {
      const updatedPresentations = presentations.filter((_, i) => i !== index);
      const updatedImages = selectedImages.filter((_, i) => i !== index);
      setPresentations(updatedPresentations);
      setSelectedImages(updatedImages);
    };

    const handleChangePresentation = (
      index: number,
      field: keyof Product.PresentationProps,
      value: string | number
    ) => {
      setPresentations((prev) =>
        prev.map((presentation, i) =>
          i === index ? { ...presentation, [field]: value } : presentation
        )
      );
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

            {presentations.map((_, i) => {
              const selectedWeight = presentations[i].weight;
              const imagesForWeight =
                images[selectedWeight as keyof typeof images] || [];

              console.log(selectedImages, imagesForWeight);

              return (
                <div key={i} className={classes["new-product__presentation"]}>
                  <Input
                    name="weight[]"
                    label="Peso"
                    select
                    options={WEIGHT_OPTIONS}
                    onChange={(e) =>
                      handleChangePresentation(i, "weight", e.target.value)
                    }
                    value={presentations[i].weight}
                  />
                  <Input
                    name="price[]"
                    label="Precio"
                    type="number"
                    defaultValue={productToEdit?.presentations?.[i]?.price ?? 0}
                    required
                  />
                  <Input
                    name="quantity[]"
                    label="Cantidad"
                    type="number"
                    defaultValue={
                      productToEdit?.presentations?.[i]?.quantity ?? 0
                    }
                    required
                  />

                  <p className={classes["new-product__aroma-label"]}>
                    {selectedWeight
                      ? `Aroma / Snack para ${
                          WEIGHT_OPTIONS.find(
                            (opt) => opt.value === selectedWeight
                          )?.label
                        }`
                      : "Selecciona un peso para ver aromas disponibles"}
                  </p>

                  <ul className={classes["new-product__images"]}>
                    {imagesForWeight.map((image: ImageData) => (
                      <li
                        key={image.src}
                        onClick={() => handleSelectImage(i, image)}
                        className={
                          selectedImages[i]?.src === image.src
                            ? classes.selected
                            : ""
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
                    name="image[]"
                    value={
                      selectedImages[i]?.src ??
                      productToEdit?.presentations?.[i]?.image ??
                      ""
                    }
                    required
                  />
                  <input
                    type="hidden"
                    name="aroma[]"
                    value={selectedImages[i]?.alt ?? ""}
                    required
                  />
                  <input
                    type="hidden"
                    name="aroma"
                    value={selectedImages[i]?.alt ?? ""}
                    required
                  />

                  <button type="button" onClick={() => removePresentation(i)}>
                    Borrar presentación
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={() => addPresentation()}>
              Agregar presentación
            </button>
            <input
              type="hidden"
              name="_method"
              value={isEditing ? "put" : "post"}
            />
            <button type="submit" className={classes["modal__btn"]}>
              Guardar
            </button>
          </Form>
          {data?.error && (
            <div className="text-red-500">
              <p>{data.error.message}</p>
              {/* {data.error.details.error.errorResponse.errmsg && (
                <p className="text-xs italic">
                  El aroma {data.error.details.error.keyValue._id} ya existe en
                  la base de datos
                </p>
              )} */}
            </div>
          )}
        </div>
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
