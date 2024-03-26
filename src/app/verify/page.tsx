"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { resendVerificationEmail, verifyEmail } from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const VerifySchema = z.object({
  code: z.string().length(6, {
    message: "Code must be 6 digits",
  }),
});

type VerifySchemaType = z.infer<typeof VerifySchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifySchemaType>({ resolver: zodResolver(VerifySchema) });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return verifyEmail(payload);
    },
    onSuccess: async (data) => {
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message, { duration: 2000 });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit: SubmitHandler<VerifySchemaType> = (data) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen mx-auto max-w-sm">
      <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
        <div className="my-4">
          <h1 className="text-3xl font-sans font-bold">EMAIL VERIFICATION</h1>
          <h2 className="text-xs font-sans-serif text-gray-500">
            Please check email to verify and enter six digit code below.
          </h2>
          <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <Input
                type="number"
                className=""
                label="Code"
                {...register("code")}
                error={errors.code && errors.code.message}
                autoFocus
              />
            </div>
            <Button
              variant={"primary"}
              type="submit"
              className="mb-3 w-full mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner width={5} height={5} className="mx-2" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
          Not receive a code?
          <Button
            variant={"link"}
            type="submit"
            onClick={() => {
              resendVerificationEmail({});
              toast.success("Code sent.", { duration: 3000 });
            }}
            className="text-purple-500"
          >
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
