'use client';

import { EditIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import { createPostSchema, CreatePostSchemaType } from '@/schema/index.t';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { communityOptions } from './search-filter-section';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function UpdatePostButton() {
  // 1. Define your form.
  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      community: 'history',
      title: 'Duis mollit mollit mollit id aliqua qui veniam.',
      content:
        'Pariatur proident ipsum deserunt sunt nostrud. Amet magna nisi cupidatat ipsum sint et. Et et et sit consequat officia. In eiusmod reprehenderit ut cillum. Commodo pariatur mollit id esse Lorem ex adipisicing aliquip Lorem commodo dolor. Magna reprehenderit amet ex laborum ea fugiat tempor.',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreatePostSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='size-7 p-0'>
          <EditIcon className='size-3' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='community'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Community' />
                        </SelectTrigger>
                        <SelectContent>
                          {communityOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder='What’s on your mind...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col sm:flex-row justify-end gap-2'>
                <DialogClose asChild>
                  <Button variant='outline' className='w-full sm:w-auto'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type='submit' className='w-full sm:w-auto'>
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
