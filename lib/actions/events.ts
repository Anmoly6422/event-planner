"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import type { RsvpStatus } from "@/app/generated/prisma";

type CreateEventInput = {
  title: string;
  description?: string;
  location?: string;
  eventDate?: string;
};

const RSVP_STATUSES =["going","maybe","not_going"] as const;

function isRsvpStatus(s:string): s is RsvpStatus {
  return (RSVP_STATUSES as readonly string[]).includes(s);
}

function parseRsvp(formData: FormData){
  const name =String (formData.get("name") ?? "").trim();
  if(name.length <2 || name.length >120){
    throw new Error ("Name must be between 2 and 120 characters.");
  }
  const email =String(formData.get("email") ??"").trim();
  if(email.length<3 || email.length >320 || !email.includes("@")){
    throw new Error ("Please enter a valid email.");
  }
  const status =String(formData.get("status") ?? "").trim();
  if(!isRsvpStatus(status)){
    throw new Error("Invalid RSVP status.");
  }
  return {name,email,status};
}


export async function createEventAction(formData: FormData) {
  try {
    const session = await getSession();
    const userId = session?.data?.user?.id;

    if (!userId) {
      redirect("/auth/sign-in");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const eventDate = formData.get("eventDate") as string;

    const created = await prisma.event.create({
      data: {
        ownerUserId: userId,
        title,
        description: description || null,
        location: location || null,
        eventDate: eventDate ? new Date(eventDate) : null,
      },
    });

    redirect(`/events/${created.id}`);
  } catch (err) {
    console.error("CREATE EVENT ERROR:", err);
    throw err;
  }
}
export async function createInviteLinkAction(eventId:string){
   const session =await getSession();
   const userId =session?.data?.user.id;

   const owns =await prisma.event.findFirst({
      
     where :{id:eventId, ownerUserId:userId},
     select:{id:true},
   })

   if(!owns){
    throw new Error("Event not found");
   }
    

   const token= crypto.randomUUID().replace(/-/g,"");


   await prisma.eventInvite.upsert({
    where: {eventId},
    create:{ eventId,token},
    update:{token},
   })
  redirect(`/events/${eventId}`);
}

export async function submitOrUpdateRsvpAction(token:string,
  formData:FormData,
){
   const input =parseRsvp(formData)
   const invite =await prisma.eventInvite.findFirst({
    where: {token},
    select:{
      id:true,
      event:{
        select:{id:true},
      }
    }
   })

   if(!invite){
    throw new Error ("Invite link is invalid");
   }

   const eventId =invite.event.id;
   const emailNormalized =input.email.toLowerCase();

   await prisma.eventRsvp.upsert({
    where:{
      eventId_emailNormalized:{
        eventId,
        emailNormalized
      }
    },

    create :{
      eventId,
      inviteId:invite.id,
      name:input.name,
      email:input.email,
      emailNormalized,
      status:input.status as RsvpStatus,
    },
    update:{
      name:input.name,
      status:input.status as RsvpStatus,
      respondedAt:new Date(),
    }
   })
 redirect(`/invite/${token}?submitted=1`) ;
}