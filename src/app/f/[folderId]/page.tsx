import { mapDbFile, mapDbFolder } from "@/lib/mappers"
import { type DriveItem } from "@/lib/types"
import DriveClient from "@/app/DriveClient"
import { getFolderContents, getBreadcrumbs } from "@/server/db/queries"

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params
  const folderIdNum = Number(folderId)

  const [{ folders, files }, breadcrumbs] = await Promise.all([
    getFolderContents(folderIdNum),
    getBreadcrumbs(folderIdNum),
  ])

  const items: DriveItem[] = [
    ...folders.map(mapDbFolder),
    ...files.map(mapDbFile),
  ]

  return <DriveClient items={items} breadcrumbs={breadcrumbs} folderId={folderIdNum} />
}
