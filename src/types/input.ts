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
    checkboxOptions?: { value: string; label: string }[];
    options?: { value: string; label: string }[];
  }
}

export type { InputLabel };
