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
    options?: { value: string; label: string }[];
  }
}

export type { InputLabel };
