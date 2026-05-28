"use client";

import { insertContact } from "@/data/insertContact";
import { useActionState, useRef, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/data/schema";

export function ContactForm() {
  const [{ result, error, formData, errors }, formAction, isPending] =
    useActionState(insertContact, {
      result: false,
      error: "",
      formData: new FormData(),
      errors: {
        name: null,
        email: null,
        reason: null,
      },
    });

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
      notes: "",
      ...(Object.fromEntries(formData) ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit() {
    startTransition(() => {
      if (!formRef.current) return;

      console.log(formRef.current);

      formAction(new FormData(formRef.current));
    });
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="field">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          {...register("name")}
          id="name"
          defaultValue={(formData.get("name") ?? "") as string}
        />
        <FieldError
          clientError={clientErrors.name}
          serverError={errors.name}
          errorId="name-error"
        />
      </div>
      <div className="field">
        <label htmlFor="name">Email: </label>
        <input
          type="email"
          {...register("email")}
          id="email"
          defaultValue={(formData.get("email") ?? "") as string}
        />
        <FieldError
          clientError={clientErrors.email}
          serverError={errors.email}
          errorId="email-error"
        />
      </div>
      <div className="field">
        <label htmlFor="reason">Grund für den Kontakt: </label>
        <select
          {...register("reason")}
          id="reason"
          defaultValue={(formData.get("reason") ?? "") as string}
        >
          <option value=""></option>
          <option value="Support">Support</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Sonstiges</option>
        </select>
        <FieldError
          clientError={clientErrors.reason}
          serverError={errors.reason}
          errorId="reason-error"
        />
      </div>
      <div className="field">
        <label htmlFor="notes">Notizen: </label>
        <textarea
          {...register("notes")}
          id="notes"
          defaultValue={(formData.get("notes") ?? "") as string}
        ></textarea>
      </div>

      {!result && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      {isPending && <p role="alert">Speichert...</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

type Err = { message?: string } | null | undefined;

function FieldError({
  clientError,
  serverError,
  errorId,
}: {
  clientError: Err;
  serverError: Err;
  errorId: string;
}) {
  const error = clientError ?? serverError;

  if (!error) return null;

  return (
    <div id={errorId} role="alert">
      {error.message}
    </div>
  );
}
