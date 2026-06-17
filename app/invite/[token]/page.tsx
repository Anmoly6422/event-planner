import { EventDetailContent } from "@/components/event-detail-content";
import { InviteRsvpContent } from "@/components/invite-rsvp-content";
import { getSession } from "@/lib/auth/server";
import { promises } from "dns";


export default async function  InvitePage( {params,searchParams}: {params: Promise<{token:string}>;
 searchParams: Promise<{submitted ?: string}>;

}){
    const {token} = await params ;
    const query =await searchParams;
    const  session =await getSession();

    return <InviteRsvpContent token={token} submitted={query.submitted ==="1"}/>;

}