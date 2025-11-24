"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Label } from "../ui/label";
import { leadCreateSchema } from "@/modules/leads/leads.schema";

type ContactValues = z.infer<typeof leadCreateSchema>;

interface ContactFormProps {
  carId?: string;
}

export function ContactForm({ carId }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(leadCreateSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  });
  const { errors } = form.formState;

  const onSubmit = async (values: ContactValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send lead");
      }

      form.reset({ ...values, message: "" });
      toast.success("Thanks! We will get back to you shortly.");
    } catch (error) {
      toast.error(`Something went wrong: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Send us the details</h2>
        <p className="text-sm text-muted-foreground">
          We will route your note to the right specialist immediately.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide">Name</Label>
          <Input
            {...form.register("fullName")}
            placeholder="Jane Doe"
            className="h-12 rounded-2xl"
          />
          <p className="text-xs text-destructive">{errors.fullName?.message}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide">Email</Label>
          <Input
            type="email"
            {...form.register("email")}
            placeholder="you@email.com"
            className="h-12 rounded-2xl"
          />
          <p className="text-xs text-destructive">{errors.email?.message}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide">Phone</Label>
        <Input
          {...form.register("phone")}
          placeholder="(555) 555-1234"
          className="h-12 rounded-2xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide">Message</Label>
        <Textarea
          rows={4}
          {...form.register("message")}
          placeholder="Tell us what you are looking for"
          className="rounded-3xl"
        />
        <p className="text-xs text-destructive">{errors.message?.message}</p>
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-full py-6 text-base font-semibold"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
