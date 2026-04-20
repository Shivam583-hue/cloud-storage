import { revalidateTag, unstable_cache } from "next/cache"
import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"
import { and, eq, isNull } from "drizzle-orm"
import type { BreadcrumbItem } from "@/app/DriveClient"

export const MUTATIONS = {
  onboardUser: async function (userId: string): Promise<number> {
    const rootFolder = await db
      .insert(folders_table)
      .values({
        name: "Root",
        parent: null,
        ownerId: userId,
      })
      .$returningId()

    const rootFolderId = rootFolder[0]?.id
    if (!rootFolderId) throw new Error("Failed to create root folder")

    await db.insert(folders_table).values([
      { name: "Trash", parent: rootFolderId, ownerId: userId },
      { name: "Shared", parent: rootFolderId, ownerId: userId },
      { name: "Documents", parent: rootFolderId, ownerId: userId },
    ])

    revalidateTag("root-folder", "max")
    return rootFolderId
  },

  createFile: async function (input: {
    file: {
      name: string
      size: number
      url: string
      type: "document" | "image" | "video" | "other"
      parent: number | null
    }
    userId: string
  }) {
    await db.insert(files_table).values({
      name: input.file.name,
      size: input.file.size,
      url: input.file.url,
      type: input.file.type,
      parent: input.file.parent,
      ownerId: input.userId,
    })

    if (input.file.parent === null) {
      revalidateTag("root-contents", "max")
    } else {
      revalidateTag("folder-contents", "max")
    }
  },
}

export const getFolderContents = unstable_cache(
  async (folderId: number) => {
    const [folders, files, currentFolder] = await Promise.all([
      db.select().from(folders_table).where(eq(folders_table.parent, folderId)),
      db.select().from(files_table).where(eq(files_table.parent, folderId)),
      db.select().from(folders_table).where(eq(folders_table.id, folderId)),
    ])
    return { folders, files, currentFolder }
  },
  ["folder-contents"],
  { tags: ["folder-contents"], revalidate: 30 }
)

export const getRootContents = unstable_cache(
  async () => {
    const [folders, files] = await Promise.all([
      db.select().from(folders_table).where(isNull(folders_table.parent)),
      db.select().from(files_table).where(isNull(files_table.parent)),
    ])
    return { folders, files }
  },
  ["root-contents"],
  { tags: ["root-contents"], revalidate: 30 }
)

export const getRootFolderForUser = unstable_cache(
  async (userId: string) => {
    const folder = await db
      .select()
      .from(folders_table)
      .where(and(eq(folders_table.ownerId, userId), isNull(folders_table.parent)))
    return folder[0]
  },
  ["root-folder"],
  { tags: ["root-folder"], revalidate: 30 }
)

export const getBreadcrumbs = unstable_cache(
  async (folderId: number): Promise<BreadcrumbItem[]> => {
    const crumbs: BreadcrumbItem[] = []
    let currentId: number | null = folderId

    while (currentId !== null) {
      const [folder] = await db
        .select()
        .from(folders_table)
        .where(eq(folders_table.id, currentId))
      if (!folder) break
      crumbs.unshift({ id: String(folder.id), name: folder.name })
      currentId = folder.parent
    }

    return crumbs
  },
  ["breadcrumbs"],
  { tags: ["breadcrumbs"], revalidate: 30 }
)
