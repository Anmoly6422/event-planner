

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";

export default function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={createEventAction} className="space-y-5">

            {/* TITLE */}
            <input
              name="title"
              placeholder="team dinner..."
              required
              className="w-full border p-2 rounded"
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="optional details about the event"
              className="w-full border p-2 rounded min-h-24"
            />

            {/* LOCATION */}
            <input
              name="location"
              placeholder="optional location"
              className="w-full border p-2 rounded"
            />

            {/* DATE */}
            <input
              name="eventDate"
              type="datetime-local"
              className="w-full border p-2 rounded"
            />

            {/* BUTTONS */}
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Create Event
              </Button>

              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}