type FormField = {
  name?: string;
  label?: string;
  type?: string;
  placeholder: string;
  required?: boolean;
};

export type FormConfigProps = {
  title?: string;
  description?: string;
  fields?: FormField[];
  initialData?: Record<string, string>;
  type?: string;
};
