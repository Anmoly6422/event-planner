"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";

export default function NewEventPage() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      eventDate: "",
    },
  });
async function onSubmit(data: any) {
  await createEventAction(data);
}

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>

        <CardContent>
          <Form form={form} >
            <form
             
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* 1. TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <input
                        id="title"
                        placeholder="team dinner..."
                        required
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        id="description"
                        placeholder="optional details about the event"
                        {...field}
                        className="w-full border p-2 rounded min-h-25"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 3. LOCATION */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <input
                        id="location"
                        placeholder="optional location"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 4. DATE & TIME */}
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date & Time</FormLabel>
                    <FormControl>
                      <input
                        id="eventDate"
                        type="datetime-local"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500">
                      Optional, you can set this later
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-xl "
              >
                Create Event
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
                   </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}