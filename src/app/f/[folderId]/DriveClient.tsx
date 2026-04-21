"use client"

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { deleteFile } from '@/server/actions'
import { toast } from "sonner"
import { type DriveItem, type FileType } from "@/lib/types"
import {
  Folder,
  FileText,
  FileImage,
  FileVideo,
  File,
  ChevronRight,
  Home,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { UploadButton } from '@/components/uploadthing'
import { useRouter } from 'next/navigation'

function getFolderIcon() {
  return <Folder className="h-5 w-5 text-blue-400" />
}

function getFileIcon(type: FileType) {
  switch (type) {
    case "document":
      return <FileText className="h-5 w-5 text-blue-300" />
    case "image":
      return <FileImage className="h-5 w-5 text-green-400" />
    case "video":
      return <FileVideo className="h-5 w-5 text-red-400" />
    default:
      return <File className="h-5 w-5 text-muted-foreground" />
  }
}

export interface BreadcrumbItem {
  id: string
  name: string
}

interface DriveClientProps {
  items: DriveItem[]
  breadcrumbs: BreadcrumbItem[]
  folderId: number
}

export default function DriveClient({ items, breadcrumbs, folderId }: DriveClientProps) {
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1
    return a.name.localeCompare(b.name)
  })

  const navigate = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Drive</h1>
            <div className="flex items-center gap-4">
              <UploadButton
                endpoint="driveUploader"
                input={{ folderId: String(folderId) }}
                appearance={{
                  button: "bg-[#51a2ff] px-4",
                  allowedContent: "hidden",
                }}
                onClientUploadComplete={() => {
                  toast.success("File Uploaded!")
                  navigate.refresh()
                }}
                onUploadError={(err) => {
                  toast.error(err.message)
                }}
              />
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-6">
          <ol className="flex items-center gap-1 text-sm">
            <li className="flex items-center gap-1">
              <Link
                href="/drive"
                className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                My Drive
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.id} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/f/${crumb.id}`}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent ${index === breadcrumbs.length - 1
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="rounded-lg border border-border">
          <div className="grid grid-cols-12 gap-4 border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-border">
            {sortedItems.length === 0 ? (
              <div className="px-4 py-12 text-center text-muted-foreground">
                This folder is empty
              </div>
            ) : (
              sortedItems.map((item) => (
                <DriveListItem key={item.id} item={item} onDelete={() => navigate.refresh()} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

interface DriveListItemProps {
  item: DriveItem
  onDelete: () => void
}

function DriveListItem({ item, onDelete }: DriveListItemProps) {
  const isFolder = item.type === "folder"

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const result = await deleteFile(Number(item.id))
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("File deleted!")
      onDelete()
    }
  }

  const content = (
    <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-sm transition-colors hover:bg-accent ${isFolder ? "cursor-pointer" : ""}`}>
      <div className="col-span-6 flex items-center gap-3">
        {isFolder ? getFolderIcon() : getFileIcon(item.type)}
        <span className="truncate text-foreground">{item.name}</span>
      </div>
      <div className="col-span-2 flex items-center text-muted-foreground">
        {item.modified}
      </div>
      <div className="col-span-2 flex items-center text-muted-foreground">
        {isFolder ? "—" : (item.size ?? "—")}
      </div>
      <div className="col-span-1 flex items-center capitalize text-muted-foreground">
        {item.type}
      </div>
      <div className="col-span-1 flex items-center justify-end">
        {!isFolder && (
          <button
            onClick={handleDelete}
            className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )

  if (isFolder) {
    return (
      <Link href={`/f/${item.id}`} className="block group">
        {content}
      </Link>
    )
  }

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
      {content}
    </a>
  )
}
