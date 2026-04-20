import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getRootFolderForUser, MUTATIONS } from "@/server/db/queries"

export default async function DrivePage() {
  const session = await auth()
  if (!session.userId) return redirect("/sign-in")

  const rootFolder = await getRootFolderForUser(session.userId)

  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.onboardUser(session.userId)
    return redirect(`/f/${rootFolderId}`)
  }

  return redirect(`/f/${rootFolder.id}`)
}

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { getRootFolderForUser, MUTATIONS } from "@/server/db/queries";
//
// export default async function DrivePage() {
//   const session = await auth();
//
//   if (!session.userId) {
//     return redirect("/sign-in");
//   }
//
//   const rootFolder = await getRootFolderForUser(session.userId);
//
//   if (!rootFolder) {
//     return (
//       <form
//         action={async () => {
//           "use server";
//           const session = await auth();
//
//           if (!session.userId) {
//             return redirect("/sign-in");
//           }
//
//           const rootFolderId = await MUTATIONS.onboardUser(session.userId);
//
//           return redirect(`/f/${rootFolderId}`);
//         }}
//       >
//         <Button>Create new Drive</Button>
//       </form>
//     );
//   }
//
//   return redirect(`/f/${rootFolder.id}`);
// }
