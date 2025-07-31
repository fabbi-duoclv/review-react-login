import { useMutation } from "@tanstack/react-query";

const VITE_DOMAIN_BE = import.meta.env.VITE_DOMAIN_BE;
export function useCheckTokenMutation(){
    const {mutate, data, error, isPending} = useMutation({
        mutationFn: async (token: string) => {
            const response = await fetch(`${VITE_DOMAIN_BE}/auth/check-token`, {
                method: 'POST',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        },
        onSuccess: (data) => {
            // console.log('--- CheckTokenMutationFn ---',data);
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return {
        mutate,
        data,
        error,
        isPending
    }
}