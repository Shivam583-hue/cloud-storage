"use server"

import { and, eq } from "drizzle-orm"
import { db } from "./db"
import { files_table } from "./db/schema"
import { auth } from "@clerk/nextjs/server"
import { UTApi } from "uploadthing/server"
import { revalidateTag } from "next/cache"

const utApi = new UTApi()

export async function deleteFile(fileId: number) {
  const session = await auth()
  if (!session.userId) return { error: "Unauthorized" }

  const [file] = await db
    .select()
    .from(files_table)
    .where(and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)))

  if (!file) return { error: "File not found" }

  // extract the key from the url
  const fileKey = file.url.split("/").pop()
  if (!fileKey) return { error: "Invalid file URL" }

  const utapiResult = await utApi.deleteFiles([fileKey])
  console.log(utapiResult)

  await db.delete(files_table).where(eq(files_table.id, fileId))

  // invalidate the right cache
  if (file.parent === null) {
    revalidateTag("root-contents", 'max')
  } else {
    revalidateTag("folder-contents", 'max')
  }

  return { success: true }
}
