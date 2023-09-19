import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadting";
import "@uploadthing/react/styles.css";
import { UploadFileResponse } from "uploadthing/client";


interface FileUplaodProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUplaod = ({ onChange, value, endpoint }: FileUplaodProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full"   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        <button
          type="button"
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4"></X>
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res?: UploadFileResponse[]) => {
        if (res) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};
