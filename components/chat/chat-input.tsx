"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Plus, } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useModal } from "@/hooks/user-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";

interface ChatInputProps {
  name: string;
  apiUrl: string;
  type: "conversation" | "channel";
  query: Record<string, any>;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ name, apiUrl, type, query }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { onOpen } = useModal();
  const router = useRouter()

  const isLoading = form.formState.isLoading;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);
      form.reset();
    } catch (error) {}
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {
                      onOpen("messageFile", { apiUrl, query });
                    }}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover: bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark-text-[#313338]"></Plus>
                  </button>
                  <Input
                    disabled={isLoading}
                    className="py-6 px-14 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  ></Input>
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default ChatInput;
