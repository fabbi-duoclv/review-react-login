import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useSignInMutation() {
  const navigate = useNavigate();
  const VITE_DOMAIN_BE = import.meta.env.VITE_DOMAIN_BE;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${VITE_DOMAIN_BE}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    },
    onSuccess: (data) => {
      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
      navigate("/");
    },
  });

  return {
    mutationFn: mutation.mutate,
    data: mutation.data,
    onError: mutation.error,
    isLoading: mutation.isPending,
  };
}
