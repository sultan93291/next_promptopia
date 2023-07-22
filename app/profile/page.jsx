"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
const MYprofile = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [posts, setposts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setposts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirm = confirm('Are you sure you want to delete the Prompt')
    if (hasConfirm) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method:'DELETE'
        })
        const filterPost = posts.filter((p) => p._id !== post._id)
        setposts(filterPost)
      } catch (e) {
        console.log(e)
      }
    }

  };

  return (
    <Profile
      name="My"
      desec="welcome to  your personalized profile page "
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MYprofile;
