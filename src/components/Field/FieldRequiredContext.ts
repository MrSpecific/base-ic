import * as React from 'react';

/**
 * Base UI's `Field.Root` has no `required` prop — `required` belongs on the
 * control itself. Our `<Field required>` publishes it through this context so
 * the base-ic controls rendered inside (Input, Textarea, Field.Control,
 * NumberField, Checkbox, Switch, RadioGroup) become natively required, which
 * drives constraint validation (`valueMissing`) and `<Field.Error>`.
 *
 * An explicit `required` prop on the control always wins.
 */
export const FieldRequiredContext = React.createContext<boolean | undefined>(undefined);

/** Resolve a control's `required` prop against an enclosing `<Field required>`. */
export function useFieldRequired(required: boolean | undefined): boolean | undefined {
  const fieldRequired = React.useContext(FieldRequiredContext);
  return required ?? fieldRequired;
}
