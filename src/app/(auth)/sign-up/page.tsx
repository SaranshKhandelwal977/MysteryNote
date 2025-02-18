"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue, useDebounceCallback  } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from "axios";
import { ApiResponse } from "@/types/ApiResponse"
import { Button } from '@/components/ui/button';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React from "react"

const Page = () => {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback (setUsername, 300); //har 300ms mei username check hoga, types krte vkt username field mei
    //agar normally check karege w/o debounced value toh call bht zyada jaayegi backend pe toh load bht zyada ho jaayega, jab username set ho rhi hai tab debouncing use horhi hai
    const { toast } = useToast();
    const router = useRouter();

    //zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })
    useEffect(()=>{
        const checkUsernameUnique = async () => {
            if(username){
                setIsCheckingUsername(true);
                setUsernameMessage('');
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`);
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
                } finally{
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data);
            if(response.status === 201){
                toast({
                    title: 'Success',
                    description: response.data.message,
                });
            }
            else{
                toast({
                    title: "Failed",
                    description: response.data.message,
                    variant: 'destructive',
                });
            }
      
            router.replace(`/verify/${username}`);
            setIsSubmitting(false);
            
        } catch (error) {
            console.error('Error during sign-up:', error);
            const axiosError = error as AxiosError<ApiResponse>;
            // Default error message
            let errorMessage = axiosError.response?.data.message;
      
            toast({
                title: 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });
      
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Join Mystery Note
                </h1>
                <p className="mb-4">Sign up to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                field.onChange(e);
                                debounced(e.target.value);
                                }}
                            />
                        </FormControl>
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && usernameMessage && (
                            <p className={`text-sm ${usernameMessage === 'Username is unique' ? 'text-green-500': 'text-red-500'}`}>
                                {usernameMessage}
                            </p>
                        )}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} name="email" />
                        </FormControl>
                        <p className='text-muted text-gray-600 text-sm'>We will send you a verification code</p>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} name="password" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                        </>
                    ) : (
                        'Sign Up'
                    )}
                    </Button>
                </form>
                </Form>
                <div className="text-center mt-4">
                <p>
                    Already a member?{' '}
                    <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                    Sign in
                    </Link>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Page