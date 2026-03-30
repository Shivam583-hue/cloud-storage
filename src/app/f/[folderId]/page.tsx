import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { mapDbFile, mapDbFolder } from "@/lib/mappers"
import { type DriveItem } from "@/lib/types"
import DriveClient, { type BreadcrumbItem } from "@/app/DriveClient"

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params
  const folderIdNum = Number(folderId)

  const [folders, files, currentFolder] = await Promise.all([
    db.select().from(folders_table).where(eq(folders_table.parent, folderIdNum)),
    db.select().from(files_table).where(eq(files_table.parent, folderIdNum)),
    db.select().from(folders_table).where(eq(folders_table.id, folderIdNum)),
  ])

  const items: DriveItem[] = [
    ...folders.map(mapDbFolder),
    ...files.map(mapDbFile),
  ]

  // for now just one crumb — full ancestor chain needs a recursive query
  const breadcrumbs: BreadcrumbItem[] = currentFolder[0]
    ? [{ id: String(currentFolder[0].id), name: currentFolder[0].name }]
    : []

  return <DriveClient items={items} breadcrumbs={breadcrumbs} />
}
