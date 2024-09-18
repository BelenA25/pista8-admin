"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/shared/firebaseConfig";
import { useState, useEffect } from "react";
import Typography from "./Typography/typography";
import { LoginFormValues, LoginSchema } from "@/shared/api/validation/loginSchema";
import { LoginField } from "./loginField";

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0); 
  const [isBlocked, setIsBlocked] = useState(false); 
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const MAX_ATTEMPTS = 3; 
  const BLOCK_DURATION = 30 * 1000; 

  useEffect(() => {
    const storedAttempts = localStorage.getItem("attemptCount");
    const storedBlockEndTime = localStorage.getItem("blockEndTime");

    if (storedAttempts) {
      setAttemptCount(parseInt(storedAttempts, 10));
    }

    if (storedBlockEndTime) {
      const endTime = parseInt(storedBlockEndTime, 10);
      setBlockEndTime(endTime);

      if (Date.now() < endTime) {
        setIsBlocked(true);
        const remainingTime = endTime - Date.now();
        setTimeout(() => {
          setIsBlocked(false);
          setAttemptCount(0);
          localStorage.removeItem("blockEndTime");
          localStorage.removeItem("attemptCount");
        }, remainingTime);
      } else {
        setIsBlocked(false);
        setAttemptCount(0);
        localStorage.removeItem("blockEndTime");
        localStorage.removeItem("attemptCount");
      }
    }
  }, []);

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/startups");
    } catch (error) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      localStorage.setItem("attemptCount", newAttemptCount.toString());

      if (newAttemptCount >= MAX_ATTEMPTS) {
        const blockEnd = Date.now() + BLOCK_DURATION;
        setBlockEndTime(blockEnd);
        localStorage.setItem("blockEndTime", blockEnd.toString());

        setIsBlocked(true); 
        toast.error(`Demasiados intentos fallidos. El formulario está bloqueado por 30 segundos.`);


        setTimeout(() => {
          setIsBlocked(false);
          setAttemptCount(0);
          localStorage.removeItem("blockEndTime");
          localStorage.removeItem("attemptCount");
        }, BLOCK_DURATION);
      } else {
        toast.error(`Credenciales inválidas. Intentos restantes: ${MAX_ATTEMPTS - newAttemptCount}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Typography tag="h1">Inicio de Sesión</Typography>

      <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-md mx-auto">
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <LoginField
              control={form.control}
              fieldName="email"
              label="Email"
              placeholder="Email"
              type="email"
              disabled={isBlocked} 
            />
            <LoginField
              control={form.control}
              fieldName="password"
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              disabled={isBlocked} 
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting || isBlocked} 
              className="bg-custom-orange text-white"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0H4z"
                    ></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
