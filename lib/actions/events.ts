"use server";

import { redirect } from "next/navigation";
import { getSession } from "../auth/server";
import { prisma } from "../prisma";

type CreateEventInput = {
  title: string;
  description?: string;
  location?: string;
  eventDate?: string;
};

export async function createEventAction(data: CreateEventInput) {
  // 1. Get user session
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 2. Validate title
  const title = data.title?.trim();

  if (!title || title.length < 3 || title.length > 120) {
    throw new Error("Title must be between 3 and 120 characters.");
  }

  // 3. Create event in DB
  const created = await prisma.event.create({
    data: {
      ownerUserId: userId,
      title,
      description: data.description?.trim().slice(0, 2000) || null,
      location: data.location?.trim().slice(0, 200) || null,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
    },
  });

  // 4. Redirect to event page
  redirect(`/events/${created.id}`);
}