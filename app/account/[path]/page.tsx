import { AccountView,  } from "@neondatabase/auth/react";
const accountViewPaths = [
  "profile",
  "security",
  "email",
  "password",
];

export function generateStaticParams(){
    return Object.values(accountViewPaths).map((path)=>({path}))
}

export default async function  AccountPage({params}:{params:Promise <{path:string}>;

}){

    const  {path} =await params;

    return (<main className=" container p-4 md:p-6"><AccountView path={path}/></main>)
}