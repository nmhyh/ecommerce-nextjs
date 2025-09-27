"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/app/auth-context";

export default function ProfilePage() {
  const { isAuthenticated, currentUser } = useAuth(); // 🔥 Lấy Auth State

  return (
    <section className="container mx-auto py-12 px-4">
      {(isAuthenticated && currentUser) ? (
        <>
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                <Image
                  src={currentUser.image || "/default-avatar.png"}
                  alt={currentUser.username}
                  fill
                  className="rounded-full object-cover border"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p className="text-gray-500">@{currentUser.username}</p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span>{currentUser.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Gender:</span>
                <span className="capitalize">{currentUser.gender}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Please log in to view your profile.</p>
      )}
    </section>
  );
};
