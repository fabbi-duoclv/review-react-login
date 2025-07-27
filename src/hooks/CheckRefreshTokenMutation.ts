import { useMutation } from "@tanstack/react-query";

const VITE_DOMAIN_BE = import.meta.env.VITE_DOMAIN_BE;
export function CheckRefreshTokenMutation (){
    const {mutate, data, error, isPending} = useMutation({
        mutationFn: async (token: string) => {
            const response = await fetch(`${VITE_DOMAIN_BE}/auth/refresh-token`, {
                method: 'POST',
                body: JSON.stringify({refresh_token: token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        },
        onSuccess: (data) => {
            console.log('--- CheckRefreshTokenMutation ---',data);
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