import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"

export default async function SandboxPage() {
  const user = await auth()
  if (!user.userId) throw new Error("User not found")

  const [folders, files] = await Promise.all([
    db.select().from(folders_table).where(eq(folders_table.ownerId, user.userId)),
    db.select().from(files_table).where(eq(files_table.ownerId, user.userId)),
  ])

  console.log({ folders, files })

  return (
    <div className="flex flex-col gap-4">
      <pre className="text-xs">{JSON.stringify({ folders, files }, null, 2)}</pre>
    </div>
  )
}
