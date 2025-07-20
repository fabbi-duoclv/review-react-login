import { useMutation } from "@tanstack/react-query";

const VITE_DOMAIN_BE = import.meta.env.VITE_DOMAIN_BE;
export const CheckTokenMutationFn = async (token: string) => {
    const res = await useMutation({
        mutationFn: async (token: string) => {
            const response = await fetch(`${VITE_DOMAIN_BE}/auth/check-token`, {
                method: 'POST',
                body: token,
            });
            return response.json();
        },
        onSuccess: (data) => {
            console.log('--- CheckTokenMutationFn ---',data);
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return {
        mutationFn: res.mutate,
        onSuccess: res.data,
        onError: res.error,
    }

}