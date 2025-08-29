import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"

type Form = { email: string; password: string };

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>();
  const { login } = useAuth();
  const nav = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loc = useLocation() as any;

  const onSubmit = async (data: Form) => {
    await login(data.email, data.password);
    const to = loc.state?.from?.pathname ?? "/dashboard";
    nav(to, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="w-full border rounded p-2"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            className="w-full border rounded p-2"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
