import * as React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { NumberField } from '../NumberField/NumberField';
import { Checkbox } from '../Checkbox/Checkbox';

afterEach(() => {
  cleanup();
});

function describedBy(el: HTMLElement): string[] {
  return (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
}

describe('Field + Input', () => {
  it('links the label to the input via for/id', () => {
    render(
      <Field label="Email">
        <Input data-testid="input" />
      </Field>,
    );
    const input = screen.getByTestId('input');
    const label = screen.getByText('Email');
    expect(input.id).toBeTruthy();
    expect(label).toHaveAttribute('for', input.id);
    expect(screen.getByLabelText('Email')).toBe(input);
  });

  it('puts description and error in aria-describedby', () => {
    render(
      <Field label="Email" description="We never share it." error="Email is required.">
        <Input data-testid="input" />
      </Field>,
    );
    const input = screen.getByTestId('input');
    const ids = describedBy(input);
    const description = screen.getByText('We never share it.');
    const error = screen.getByText('Email is required.');
    expect(ids).toContain(description.id);
    expect(ids).toContain(error.id);
  });

  it('reflects Field invalid state on the input (data-invalid, aria-invalid)', () => {
    render(
      <Field label="Email" invalid>
        <Input data-testid="input" />
      </Field>,
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('data-invalid');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('treats an `error` prop as invalid', () => {
    render(
      <Field label="Email" error="Bad email">
        <Input data-testid="input" />
      </Field>,
    );
    expect(screen.getByTestId('input')).toHaveAttribute('data-invalid');
  });

  it('shows the message returned by `validate` after blur', async () => {
    render(
      <Field
        label="Username"
        validationMode="onBlur"
        validate={(value) => (value === 'admin' ? 'That name is taken.' : null)}
      >
        <Input data-testid="input" />
      </Field>,
    );
    const input = screen.getByTestId('input');
    expect(screen.queryByText('That name is taken.')).toBeNull();

    await act(async () => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'admin' } });
      fireEvent.blur(input);
    });

    const error = await screen.findByText('That name is taken.');
    expect(input).toHaveAttribute('data-invalid');
    expect(describedBy(input)).toContain(error.id);
  });

  it('`required` on Field makes the control required and surfaces the native message', async () => {
    render(
      <Field label="Name" required validationMode="onBlur">
        <Input data-testid="input" />
      </Field>,
    );
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input).toBeRequired();

    // Base UI only reports valueMissing once the field is dirty.
    await act(async () => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'x' } });
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.blur(input);
    });

    expect(input).toHaveAttribute('data-invalid');
    expect(input.validationMessage).toBeTruthy();
    const error = await screen.findByText(input.validationMessage);
    expect(describedBy(input)).toContain(error.id);
  });

  it('lets an explicit `required={false}` on the control win over Field', () => {
    render(
      <Field label="Name" required>
        <Input data-testid="input" required={false} />
      </Field>,
    );
    expect(screen.getByTestId('input')).not.toBeRequired();
  });

  it('keeps standalone `invalid` support via aria-invalid and forwards refs', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} invalid data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(ref.current).toBe(input);
  });

  it('exposes Field.Control as a Field-aware styled input', () => {
    render(
      <Field label="City">
        <Field.Control data-testid="input" />
      </Field>,
    );
    expect(screen.getByLabelText('City')).toBe(screen.getByTestId('input'));
  });
});

describe('Field + Textarea', () => {
  it('links label, description, and error to the textarea', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(
      <Field label="Bio" description="A short intro." error="Too short.">
        <Textarea ref={ref} data-testid="textarea" rows={3} />
      </Field>,
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(ref.current).toBe(textarea);
    expect(textarea).toHaveAttribute('rows', '3');
    expect(screen.getByText('Bio')).toHaveAttribute('for', textarea.id);
    const ids = describedBy(textarea);
    expect(ids).toContain(screen.getByText('A short intro.').id);
    expect(ids).toContain(screen.getByText('Too short.').id);
    expect(textarea).toHaveAttribute('data-invalid');
  });

  it('runs `validate` against the textarea value', async () => {
    render(
      <Field
        label="Bio"
        validationMode="onBlur"
        validate={(value) => (String(value).length < 5 ? 'At least 5 characters.' : null)}
      >
        <Textarea data-testid="textarea" />
      </Field>,
    );
    const textarea = screen.getByTestId('textarea');
    await act(async () => {
      fireEvent.focus(textarea);
      fireEvent.change(textarea, { target: { value: 'hey' } });
      fireEvent.blur(textarea);
    });
    expect(await screen.findByText('At least 5 characters.')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-invalid');
  });
});

describe('Field + other controls', () => {
  it('links and marks NumberField and Checkbox invalid inside an invalid Field', () => {
    render(
      <>
        <Field label="Qty" invalid>
          <NumberField className="nf-root" style={{ marginTop: 4 }} />
        </Field>
        <Field label="Agree" invalid>
          <Checkbox data-testid="checkbox" />
        </Field>
      </>,
    );
    const qty = screen.getByLabelText('Qty');
    expect(qty.tagName).toBe('INPUT');
    expect(qty).toHaveAttribute('data-invalid');
    // className + style land on the same (root) element, which also gets data-invalid.
    const nfRoot = qty.closest('.nf-root') as HTMLElement;
    expect(nfRoot).toBeTruthy();
    expect(nfRoot.style.marginTop).toBe('4px');
    expect(nfRoot).toHaveAttribute('data-invalid');
    expect(screen.getByTestId('checkbox')).toHaveAttribute('data-invalid');
  });

  it('lets NumberField stepper labels be overridden', () => {
    render(<NumberField decrementLabel="Moins" incrementLabel="Plus" />);
    expect(screen.getByLabelText('Moins')).toBeInTheDocument();
    expect(screen.getByLabelText('Plus')).toBeInTheDocument();
  });
});
