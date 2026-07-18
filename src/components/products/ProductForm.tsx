import { createPortal } from "react-dom";
import { Input } from "../common/Input";
import classes from "./ProductForm.module.css";
import {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import type { Product } from "../../types/product";
import { images } from "../../data/images";

const TITLE_OPTIONS = [
  { value: "Arena Calabaza", label: "Arena Calabaza" },
  { value: "Snack Calabaza", label: "Snack Calabaza" },
];

const WEIGHT_OPTIONS = [
  { value: "4.5kg", label: "4.5kg" },
  { value: "10kg", label: "10kg" },
  { value: "25kg", label: "25kg" },
  { value: "15g", label: "15g" },
  { value: "75g", label: "75g" },
];

const EMPTY_PRESENTATION: Product.PresentationProps = {
  weight: "",
  price: 0,
  quantity: 0,
  image: "",
};

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
    >([EMPTY_PRESENTATION]);

    const data = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const dialog = useRef<HTMLDialogElement>(null);
    const isEditing = !!productToEdit;
    const isSaving = navigation.state === "submitting";

    // Al abrir en modo edición, carga las presentaciones existentes.
    useEffect(() => {
      if (productToEdit) {
        setPresentations(productToEdit.presentations);
        setSelectedImages(
          productToEdit.presentations.map((presentation) => ({
            src: presentation.image,
            alt: productToEdit.aroma,
          }))
        );
      } else {
        setPresentations([EMPTY_PRESENTATION]);
        setSelectedImages([null]);
      }
    }, [productToEdit]);

    // Cierra el modal al guardar con éxito; si la sesión expiró, va al login.
    useEffect(() => {
      if (navigation.state !== "idle") return;
      if (data?.success) {
        handleClose();
      } else if (data?.error?.sessionExpired) {
        handleClose();
        navigate("/login", { replace: true });
      }
    }, [data, navigation.state, navigate]);

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
      setPresentations((prev) => [...prev, EMPTY_PRESENTATION]);
      setSelectedImages((prev) => [...prev, null]);
    };

    const removePresentation = (index: number): void => {
      setPresentations((prev) => prev.filter((_, i) => i !== index));
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
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
              defaultValue={
                isEditing
                  ? TITLE_OPTIONS.find((opt) =>
                      productToEdit?.title.startsWith(opt.value)
                    )?.value
                  : undefined
              }
              required
            />
            <Input
              label="Descripción"
              name="description"
              textarea
              defaultValue={productToEdit?.description}
              required
            />

            {presentations.map((presentation, i) => {
              const selectedWeight = presentation.weight;
              const imagesForWeight =
                images[selectedWeight as keyof typeof images] || [];

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
                    value={presentation.weight}
                  />
                  <Input
                    name="price[]"
                    label="Precio"
                    type="number"
                    value={presentation.price}
                    onChange={(e) =>
                      handleChangePresentation(
                        i,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    required
                  />
                  <Input
                    name="quantity[]"
                    label="Cantidad"
                    type="number"
                    value={presentation.quantity}
                    onChange={(e) =>
                      handleChangePresentation(
                        i,
                        "quantity",
                        Number(e.target.value)
                      )
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
                    value={selectedImages[i]?.src ?? presentation.image ?? ""}
                  />
                  <input
                    type="hidden"
                    name="aroma"
                    value={
                      selectedImages[i]?.alt ?? productToEdit?.aroma ?? ""
                    }
                  />

                  <button type="button" onClick={() => removePresentation(i)}>
                    Borrar presentación
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className={classes["add-presentation"]}
              onClick={() => addPresentation()}
            >
              Agregar presentación
            </button>
            <input
              type="hidden"
              name="_method"
              value={isEditing ? "put" : "post"}
            />
            <button
              type="submit"
              className={classes["modal__btn"]}
              disabled={isSaving}
            >
              {isSaving ? "Guardando…" : "Guardar"}
            </button>
          </Form>
          {data?.error && !data.success && (
            <div className={classes["modal__error"]}>
              <p>{data.error.message}</p>
            </div>
          )}
        </div>
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);
