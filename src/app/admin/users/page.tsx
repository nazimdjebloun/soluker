// app/admin/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";


async function createUser() {
  try {
    const res = await fetch("/api/users/create-users", { method: "POST" });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    alert("User created: " + data.user.id);
  } catch (err: any) {
    console.error(err);
    alert("Error: " + err.message);
  }
}



export default function Page() {
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 
    async function getUsers() {
      try {
        const res = await fetch("/api/users/get-users", { method: "GET" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setUsers(data.users);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
      }
    }
    useEffect(() => {
      getUsers();
    }, []);
    
        return (
          <div>
            <Button onClick={createUser}>Create Admin</Button>

            <div>
              <h2 className="text-2xl font-semibold mb-4">All Users</h2>

              {loading ? (
                <p className="text-gray-500">Loading users...</p>
              ) : (
                <ul className="space-y-2">
                  {users.length === 0 && (
                    <p className="text-gray-500">No users found.</p>
                  )}
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className="p-3 border rounded-md shadow-sm bg-white flex justify-between items-center"
                    >
                      <div className="flex-1 min-w-0">
                        {/* Correctly referencing the new API field: primaryEmail */}
                        <p className="font-medium truncate">
                          {user.emailAddresses[0].emailAddress}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.firstName || "N/A"} {user.lastName || "N/A"}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 ml-4">
                        ID: {user.id}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
    }

