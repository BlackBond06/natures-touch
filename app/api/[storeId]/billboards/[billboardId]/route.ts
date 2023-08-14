import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}:{params:{billboardId:string}}){

    try {
        

        if(!params.billboardId){
            new NextResponse("Billboard id is required", {status: 400});
        }

       

       

        const billboard = await prismadb.billboard.findUnique({
            where:{
               id: params.billboardId,
                      
            },

        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("BILLBOARD_GET]", error);
        return new NextResponse("Internal error", {status: 500});
        
    }

}

export async function PATCH(
    req: Request, 
    {params}:{params:{storeId:string, billboardId: string}}
    ){

    try {
        const {userId} = auth();
        const body = await req.json();

        const {label, imageURL} = body;

       

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!label){
            return new NextResponse("Label is required", {status: 400});
        }

        if(!imageURL){
            return new NextResponse("Image URL is required", {status: 400});
        }

        if(!params.billboardId){
            new NextResponse("Billboard id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            new NextResponse("Unauthorized", {status: 400});
        }

        const billboard = await prismadb.billboard.updateMany({
            where:{
                id: params.billboardId,          
            },

            data:{
                label,
                imageURL
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error);
        return new NextResponse("Internal error", {status: 500});
        
    }

}
export async function DELETE(req: Request, {params}:{params:{ storeId: string, billboardId:string}}){

    try {
        const {userId} = auth();
        

       

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        

        if(!params.billboardId){
            new NextResponse("Billboard id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            new NextResponse("Unauthorized", {status: 400});
        }

        const billboard = await prismadb.billboard.deleteMany({
            where:{
               id: params.billboardId,
                      
            },

        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("BILLBOARD_DELETE]", error);
        return new NextResponse("Internal error", {status: 500});
        
    }

}