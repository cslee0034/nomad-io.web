import AuthLayout from "../../components/auth-layout";
import { Loader2 } from "lucide-react";
import { convertNullToEmptyString } from "../../lib/utils";
import { LoginResponse } from "../../interfaces/login-response";
import { useOauth } from "../../hooks/useOauth";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import router from "next/router";

export default function Oauth(query: LoginResponse) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useOauth();

  useEffect(() => {
    mutate(query, {
      onSuccess: () => {
        setIsError(false);
      },
      onError: (error) => {
        setIsError(true);
        setErrorMessage(error.message);
      },
    });
  }, []);

  return (
    <AuthLayout>
      <section className="flex flex-col justify-center items-center h-screen">
        {isPending && (
          <div className="flex justify-center items-center">
            <p className="text-lg mx-2">Redirecting...</p>
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <p className="text-lg my-2">{errorMessage}</p>
              <Button onClick={() => router.push("/")}>Back Home</Button>
            </div>
          </div>
        )}
      </section>
    </AuthLayout>
  );
}

export async function getServerSideProps({ query }: any) {
  Object.entries(query).forEach(([key, value]) => {
    query[key] = convertNullToEmptyString(value as string);
  });

  return { props: query };
}
