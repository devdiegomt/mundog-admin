namespace InputLabel {
  export interface Props {
    label: string;
    name: string;
    type?: string;
    labelClassName?: string;
    className?: string;
    select?: boolean;
    placeholder?: string;
    textarea?: boolean;
    checkbox?: boolean;
    value?: string | number | readonly string[] | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    checkboxOptions?: { value: string; label: string }[];
    options?: { value: string; label: string }[];
    required?: boolean;
    onChange?: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
  }
}

export type { InputLabel };
