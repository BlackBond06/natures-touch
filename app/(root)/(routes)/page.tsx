"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import { UserButton } from "@clerk/nextjs";
import { log } from "console";
import { useEffect } from "react";

export default function Home() {
   const {onOpen, isOpen} = useStoreModal();
   
   useEffect(()=>{
      if(!isOpen){
         onOpen();
      }
   }, [isOpen, onOpen]);
   

    return null;
  }