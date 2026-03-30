import { type DB_FileType, type DB_FolderType } from "@/server/db/schema"
import { type FileItem, type FolderItem } from "@/lib/types"

export function mapDbFile(file: DB_FileType): FileItem {
  return {
    id: String(file.id),
    name: file.name,
    type: file.type,
    size: String(file.size),
    url: file.url,
    modified: file.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }
}

export function mapDbFolder(folder: DB_FolderType): FolderItem {
  return {
    id: String(folder.id),
    name: folder.name,
    type: "folder",
    modified: folder.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }
}
