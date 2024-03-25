import { createIdea } from "@/routes/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const useCreateIdeaMutation = (payload: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: any) => {
      return createIdea(payload);
    },
    onSuccess: async (data) => {
      //   await queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast.success("Successfully created the new idea!", { duration: 2000 });
      router.push("/ideas");
    },
    onError: (error) => {
      toast.error(error.message, { duration: 2000 });
      console.log("error", error.message);
    },
    onSettled: () => {
      //   setIsSubmitting(false);
    },
  });
};
