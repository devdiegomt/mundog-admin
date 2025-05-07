import { createPortal } from "react-dom";
import { Input } from "../common/Input";
import classes from "./ProductForm.module.css";

const OPTIONS = [
  { value: "1", label: "Arena 4.5kg" },
  { value: "2", label: "Arena 10kg" },
  { value: "3", label: "Arena 25kg" },
];

export const Form = () => {
  return createPortal(
    <dialog open className={classes.modal}>
      <h1>Form</h1>
      <form className={classes["modal__form"]}>
        <Input
          label="Título del producto"
          name="title"
          select
          options={OPTIONS}
        />
        <Input label="Descripción" name="description" textarea />
        <button type="button">Test</button>
      </form>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};
