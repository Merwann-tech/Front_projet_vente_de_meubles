"use client";
import { UserStar, UserRoundPen } from "lucide-react";
import { useState, useEffect } from "react";
const url = process.env.NEXT_PUBLIC_URL;

interface VolunteerCardProps {
  name: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  moderator: number;
  admin: number;
}

export default function UsersCard({ name }: VolunteerCardProps) {
  const [data, setPosts] = useState<User[]>([]);
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    fetch(`${url}/users/name/${name}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.status !== 200) {
        window.location.href = "/";
      } else {
        const data = await response.json();
        setPosts(data);
      }
    });
  }, [name]);

  return (
    <div className="container mx-auto px-4 py-10">
      {data.map((user) => (
        <div
          className="bg-white rounded-2xl shadow-lg mb-6 p-6 flex justify-between items-center hover:shadow-xl transition"
          key={user.id}
        >
          <div>
            <p className="font-bold text-xl text-teal-700">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-gray-500 text-base">{user.email}</p>
          </div>
          <div className="flex gap-3">
            {user.moderator === 1 ? (
              <button
                className="bg-teal-100 text-teal-700 p-3 rounded-full hover:bg-teal-200 transition shadow"
                title="Retirer les droits de modérateur"
                onClick={async () => {
                  if (
                    confirm(
                      `Veux-tu vraiment retirer les droits de modérateur à ${user.firstname} ${user.lastname} ?`
                    ) === false
                  ) {
                    return;
                  }
                  const res = await fetch(
                    `${url}/users/removeModerator/${user.id}`,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (res.status !== 200) {
                    window.location.href = "/";
                  } else {
                    let response = await res.json();
                    alert(response["success"]);
                    window.location.reload();
                  }
                }}
              >
                <UserRoundPen />
              </button>
            ) : (
              <button
                className="bg-white border border-teal-600 text-teal-600 p-3 rounded-full hover:bg-teal-50 transition shadow"
                title="Donner les droits de modérateur"
                onClick={async () => {
                  if (
                    confirm(
                      `Veux-tu vraiment donner les droits de modérateur à ${user.firstname} ${user.lastname} ?`
                    ) === false
                  ) {
                    return;
                  }
                  const res = await fetch(
                    `${url}/users/addModerator/${user.id}`,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (res.status !== 200) {
                    window.location.href = "/";
                  } else {
                    let response = await res.json();
                    alert(response["success"]);
                    window.location.reload();
                  }
                }}
              >
                <UserRoundPen />
              </button>
            )}
            {user.admin === 1 ? (
              <button
                className="bg-teal-100 text-teal-700 p-3 rounded-full hover:bg-teal-200 transition shadow"
                title="Retirer les droits d'administrateur"
                onClick={async () => {
                  if (
                    confirm(
                      `Veux-tu vraiment retirer les droits de administrateur à ${user.firstname} ${user.lastname} ?`
                    ) === false
                  ) {
                    return;
                  }
                  const res = await fetch(
                    `${url}/users/removeAdmin/${user.id}`,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (res.status !== 200) {
                    window.location.href = "/";
                  } else {
                    let response = await res.json();
                    alert(response["success"]);
                    window.location.reload();
                  }
                }}
              >
                <UserStar />
              </button>
            ) : (
              <button
                className="bg-white border border-teal-600 text-teal-600 p-3 rounded-full hover:bg-teal-50 transition shadow"
                title="Donner les droits d'administrateur"
                onClick={async () => {
                  if (
                    confirm(
                      `Veux-tu vraiment donner les droits de administrateur à ${user.firstname} ${user.lastname} ?`
                    ) === false
                  ) {
                    return;
                  }
                  const res = await fetch(
                    `${url}/users/addAdmin/${user.id}`,
                    {
                      method: "PUT",
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (res.status !== 200) {
                    window.location.href = "/";
                  } else {
                    let response = await res.json();
                    alert(response["success"]);
                    window.location.reload();
                  }
                }}
              >
                <UserStar />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
