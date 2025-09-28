"use client";

import useSWR from "swr";
import { authService } from "@/services/auth.service";
import { UserProfile } from "@/services/models";
import { usePathname } from "next/navigation";

async function fetchCurrentUser(): Promise<UserProfile | null> {
  try {
    return await authService.getCurrentUser();
  } catch (err) {
    // Token hết hạn hoặc lỗi → logout
    authService.logout();
    return null;
  }
}

export function useAuthUser() {
  const pathname = usePathname();
  const is404 = pathname === "/404";

  const { data, error, isLoading, mutate } = useSWR<UserProfile | null>(
    is404 ? null : "currentUser", // key cache
    fetchCurrentUser,
    {
      revalidateOnFocus: false, // tránh gọi lại liên tục khi focus
      shouldRetryOnError: false,
    }
  );

  return {
    currentUser: data as UserProfile,
    isAuthenticated: !!data,
    loading: isLoading,
    error,
    mutateUser: mutate, // có thể dùng mutate() sau khi login/logout
  };
}
