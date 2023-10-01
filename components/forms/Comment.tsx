"use client"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {usePathname, useRouter} from 'next/navigation'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import {zodResolver} from '@hookform/resolvers/zod';
import { CommentValidation } from "@/lib/validations/thread";

import { ChangeEvent, useState } from "react";

import { isBase64Image } from "@/lib/utils";


import path from "path";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";
interface Props{
    threadId:string;
    currentUserImg:string;
    currentUserId:string;
}
const Comment = ({threadId, currentUserImg, currentUserId}:Props) => {
    const router = useRouter();
  const pathname = usePathname();
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues:{
            thread:'',
           
        }
        })
    const onSubmit = async (values:z.infer<typeof CommentValidation>)=>{
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname
        );
        form.reset();
   
    }
    return (
        <Form {...form}>
        <form 
         onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel >
                <Image src={currentUserImg} alt="profile iamge" width={48} height={48} className="rounded-full object-cover"/>
                </FormLabel>
              <FormControl>
                <Input
                type="text"
                placeholder="Comment ..."
                className="text-dark-1 outline-none no-focus"
              {...field}/>
              </FormControl>
           
            </FormItem>
          )}
          />
          <Button type="submit" className="comment-form_btn">
Reply
          </Button>
        </form>
        </Form>
      );
}
 
export default Comment;