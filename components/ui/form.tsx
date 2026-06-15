"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";

/* ----------------------------- FORM WRAPPER ----------------------------- */
/**
 * Proper typed wrapper around FormProvider
 */
type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children: React.ReactNode;
};

function Form<T extends FieldValues>({
  form,
  children,
}: FormProps<T>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

/* ------------------------------- FORM FIELD ------------------------------ */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return <Controller {...props} />;
};

/* -------------------------------- ITEM ---------------------------------- */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

/* -------------------------------- LABEL --------------------------------- */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/* ------------------------------ CONTROL --------------------------------- */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  return <Slot ref={ref} {...props} />;
});
FormControl.displayName = "FormControl";

/* ------------------------------ MESSAGE --------------------------------- */
const FormMessage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = Object.values(errors)?.[0]?.message as
    | string
    | undefined;

  if (!error) return null;

  return (
    <p
      className={cn("text-sm text-red-500", className)}
      {...props}
    >
      {error}
    </p>
  );
};

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};