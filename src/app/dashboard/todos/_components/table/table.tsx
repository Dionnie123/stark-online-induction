"use client";

import React from "react";
import useSWR from "swr";
import { Todo } from "@prisma/client";
import { DataTable } from "./datatable";
import { columns } from "./columns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoList() {
  const {
    data: todos,
    error,
    isLoading,
    isValidating,
  } = useSWR<Todo[]>("/api/todos", fetcher);

  const todoList = todos || [];

  return <DataTable key="/api/todos" columns={columns} data={todoList} />;
}