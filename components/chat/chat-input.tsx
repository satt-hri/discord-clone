import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  return <div>chatinput</div>;
};

export default ChatInput;
