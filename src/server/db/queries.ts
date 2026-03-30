import { unstable_cache } from "next/cache"
import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"
import { eq, isNull } from "drizzle-orm"
import type { BreadcrumbItem } from "@/app/DriveClient"

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
