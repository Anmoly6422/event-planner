import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { FormField } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";




export async function InviteRsvpContent( {token,submitted}:{
    token:string;
    submitted:boolean}){
     
    const row= await prisma.eventInvite.findFirst({
        where: {token},
       include:{
       event:{
         select:{
            id:true,
            title:true,
            description:true,
            location:true,
            eventDate:true,
        },
       },
    },
    });
    if(!row){
        notFound();
    }
    const e=row.event;
    const event={
        title: e.title,
        description:e.description,
        location:e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() :null,
    }

  
   const submitRsvpForToken = async (formData: FormData) => {
  "use server";
  await submitOrUpdateRsvpAction(token, formData);
};
    
   return <div className="flex flex-1 flex-col gap-6">
     <Card>
        <CardHeader className="space-y-3">
            <Badge variant ="secondary" className="w-fit">
                RSVP
            </Badge>
            <CardTitle>{event.title}</CardTitle>
            <p className=" text-sm text-muted-foreground">
                {event.eventDate
                ? new Date(event.eventDate).toLocaleString()
            : "No date selected"}
            {event.location ?` -${event.location}` :""}
            </p>
            {event.description ?(
                <p className="text-sm text-muted-foreground">
                    {event.description}
                </p>
            ): null}
        </CardHeader>
        <CardContent>
          {submitted ? (
  <p className="mb-4 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700">
    Thanks. Your RSVP has been recorded (or updated).
  </p>
) : null}
            <form className="space-y-4" action={submitRsvpForToken}>

  {/* NAME */}
  <div className="space-y-1">
    <Label htmlFor="name">Name</Label>
    <Input id="name" name="name" required placeholder="your name" />
  </div>

  {/* EMAIL */}
  <div className="space-y-1">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      name="email"
      type="email"
      required
      placeholder="you@example.com"
    />
  </div>

  {/* STATUS */}
  <div className="space-y-1">
    <Label htmlFor="status">Attendance</Label>

   <select
  id="status"
  name="status"
  defaultValue="going"
  required
  className="flex h-10 w-full appearance-none rounded-md border border-border bg-background px-3 text-sm shadow-sm transition-colors
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
             hover:border-muted-foreground"
>
  <option value="going">Going</option>
  <option value="maybe">Maybe</option>
  <option value="not_going">Not Going</option>
</select>
  </div>

  {/* SUBMIT */}
  <Button type="submit" className="w-full">
     Submit RSVP
  </Button>

</form>
        </CardContent>
     </Card>

   </div>


}