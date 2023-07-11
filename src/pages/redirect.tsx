import { signInUser } from "@/lib/firebase/utils";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { AuthError } from "firebase/auth";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter()
  
  useEffect(() => {
    switch (router.query.mode) {
      case "signIn":
        const signIn = async () => {
          try {
            const user = await signInUser()
            router.push("/dashboard")
          }
          catch (error) {
            notifications.show({
              title: 'Failed to sign in',
              message: (error as AuthError).message,
              color: "red",
              icon: <IconX />,
              autoClose: 3000
            })
            router.push("/")
          }
        }
        signIn()
        break
      default:
        router.push("/")
        break
    }
  }, [router])
  
  return (
    <>Redirecting...</>
  )
}