import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "../../components/auth-layout";
import { useSignUp } from "../../hooks/useSignUp";
import { useState } from "react";
import { SignUpRequest } from "../../interfaces/signup-request";
import { AlertModal } from "../../components/alert-modal";

export default function SignUpForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>();

  const { mutate, isPending } = useSignUp();

  const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error) => {
        setIsModalOpen(true);
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <AuthLayout>
      <section>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="Chang Su"
                    required
                    {...register("firstName")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Lee"
                    required
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nomad@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", {
                    maxLength: {
                      value: 30,
                      message: "Password must be no longer than 30 characters.",
                    },
                  })}
                />
                {errors.password &&
                  typeof errors.password.message === "string" && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?&nbsp;
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={errorMessage}
      />
    </AuthLayout>
  );
}
