"use client";
import { Check,X,UserStar,UserRoundPen } from "lucide-react";
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
    <div>
      {data.map((user) => (
        <div className="space-y-3 mb-2" key={user.id}>
          <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
            <div>
              <p className="font-medium">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
                {user.moderator === 1 ? (
                    <button  className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200"
                    onClick={async () => {
                        if(confirm(`Veux-tu vraiment retirer les droits de modérateur à ${user.firstname} ${user.lastname} ?` )=== false){
                            return;
                        }
                      const res = await fetch(`${url}/users/removeModerator/${user.id}`, {
                        method: "PUT",
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      });   
                        if (res.status !== 200) {
                            window.location.href = "/";
                        } else {
                            let response = await res.json();
                            alert(response["success"]);
                            window.location.reload();
                        }   
                    }}>
                    <UserRoundPen/>
                    </button>
                ) : (
                    <button  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                    onClick={async () => {
                        if(confirm(`Veux-tu vraiment donner les droits de modérateur à ${user.firstname} ${user.lastname} ?` )=== false){
                            return;
                        }
                      const res = await fetch(`${url}/users/addModerator/${user.id}`, {
                        method: "PUT",
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      });   
                        if (res.status !== 200) {
                            window.location.href = "/";
                        } else {
                            let response = await res.json();
                            alert(response["success"]);
                            window.location.reload();
                        }   
                    }}>
                    <UserRoundPen />
                    </button>
                )}
                 {user.admin === 1 ? (
                    <button  className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200"
                    onClick={async () => {
                        if(confirm(`Veux-tu vraiment retirer les droits de administrateur à ${user.firstname} ${user.lastname} ?` )=== false){
                            return;
                        }
                      const res = await fetch(`${url}/users/removeAdmin/${user.id}`, {
                        method: "PUT",
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      });   
                        if (res.status !== 200) {
                            window.location.href = "/";
                        } else {
                            let response = await res.json();
                            alert(response["success"]);
                            window.location.reload();
                        }   
                    }}>
                    <UserStar/>
                    </button>
                ) : (
                    <button  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                    onClick={async () => {
                        if(confirm(`Veux-tu vraiment donner les droits de administrateur à ${user.firstname} ${user.lastname} ?` )=== false){
                            return;
                        }
                      const res = await fetch(`${url}/users/addAdmin/${user.id}`, {
                        method: "PUT",
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      });   
                        if (res.status !== 200) {
                            window.location.href = "/";
                        } else {
                            let response = await res.json();
                            alert(response["success"]);
                            window.location.reload();
                        }   
                    }}>
                    <UserStar />
                    </button>
                )}
                
              {/* <ButtonDelete
                onSmash={() => {
                  let answer = confirm(
                    `Veux-tu vraiment supprimer ${volunteer.firstname} ${volunteer.lastname} ?`
                  );
                  if (answer) {
                    fetch(`${url}/volunteers/${volunteer.id}`, {
                      method: "DELETE",
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }).then(async (response) => {
                      if (response.status !== 200) {
                        window.location.href = "/";
                      } else {
                        setPosts(data.filter((v) => v.id !== volunteer.id));
                      }
                    });
                  }
                }}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
