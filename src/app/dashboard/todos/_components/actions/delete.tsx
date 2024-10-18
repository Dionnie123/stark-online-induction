"use client";

import React from "react";
import { mutate } from "swr";

export async function fetchAllItems() {
  console.log("REFETCHING???");
  const response = await fetch("/api/todos");
  const data = await response.json();
  return data;
}

export default function DeleteTodo({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });
      mutate("/api/todos");
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <p className="w-full p-2 py-1" onClick={handleDelete}>
        Delete
      </p>
    </>
  );
}
