import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Lấy domain backend từ biến môi trường
const VITE_DOMAIN_BE = import.meta.env.VITE_DOMAIN_BE;

// Interface cho Todo
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

// Interface cho dữ liệu tạo Todo mới
export interface CreateTodoDto {
  title: string;
  completed?: boolean;
  userId: number;
}

// Interface cho dữ liệu cập nhật Todo
export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

// Hàm lấy userId từ token
const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  
  try {
    // Giải mã JWT để lấy userId (phần này có thể cần điều chỉnh tùy vào cấu trúc token)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    return null;
  }
};

// Hook lấy danh sách todos
export function useTodos() {
  const userId = getUserIdFromToken();
  
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      if (!userId) throw new Error("Người dùng chưa đăng nhập");
      
      const response = await fetch(`${VITE_DOMAIN_BE}/todos?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Không thể lấy danh sách todos");
      }
      
      return response.json();
    },
    enabled: !!userId, // Chỉ gọi API khi có userId
  });
}

// Hook tạo todo mới
export function useCreateTodo() {
  const queryClient = useQueryClient();
  const userId = getUserIdFromToken();
  
  return useMutation({
    mutationFn: async (data: { title: string; completed?: boolean }) => {
      if (!userId) throw new Error("Người dùng chưa đăng nhập");
      
      const todoData: CreateTodoDto = {
        ...data,
        userId,
      };
      
      const response = await fetch(`${VITE_DOMAIN_BE}/todos`, {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Không thể tạo todo mới");
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Làm mới danh sách todos sau khi tạo mới
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// Hook cập nhật todo
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateTodoDto }) => {
      const response = await fetch(`${VITE_DOMAIN_BE}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Không thể cập nhật todo");
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Làm mới danh sách todos sau khi cập nhật
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// Hook xóa todo
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${VITE_DOMAIN_BE}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Không thể xóa todo");
      }
      
      return true;
    },
    onSuccess: () => {
      // Làm mới danh sách todos sau khi xóa
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
} 