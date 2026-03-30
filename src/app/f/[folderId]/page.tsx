import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { mapDbFile, mapDbFolder } from "@/lib/mappers"
import { type DriveItem } from "@/lib/types"
import DriveClient from "@/app/DriveClient"

export default async function DrivePage(props: {
  params: Promise<{ folderId: string }>;
}) {

  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid Folder ID</div>
  }

  const [folders, files] = await Promise.all([
    // folder
    db.select().from(folders_table).where(eq(folders_table.parent, parsedFolderId)),


    //file
    db.select().from(files_table).where(eq(files_table.parent, parsedFolderId)),
  ])

  const items: DriveItem[] = [
    ...folders.map(mapDbFolder),
    ...files.map(mapDbFile),
  ]

  return <DriveClient initialItems={items} />
}
