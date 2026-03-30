"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { type DriveItem, type FileType } from "@/lib/types"
import {
  Folder,
  FileText,
  FileImage,
  FileVideo,
  File,
  ChevronRight,
  Upload,
  Home,
} from "lucide-react"

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

interface BreadcrumbPath {
  id: string
  name: string
  items: DriveItem[]
}

interface DriveClientProps {
  initialItems: DriveItem[]
}

export default function DriveClient({ initialItems }: DriveClientProps) {
  const [currentPath, setCurrentPath] = useState<BreadcrumbPath[]>([
    { id: "root", name: "My Drive", items: initialItems },
  ])

  const currentItems = currentPath[currentPath.length - 1]!.items

  const handleFolderClick = (item: DriveItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([
        ...currentPath,
        { id: item.id, name: item.name, items: item.children },
      ])
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  const handleUploadClick = () => {
    alert("Upload functionality would open a file picker here!")
  }

  const sortedItems = [...currentItems].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Drive</h1>
            <Button onClick={handleUploadClick} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-6">
          <ol className="flex items-center gap-1 text-sm">
            {currentPath.map((crumb, index) => (
              <li key={crumb.id} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent ${
                    index === currentPath.length - 1
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {crumb.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="rounded-lg border border-border">
          <div className="grid grid-cols-12 gap-4 border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Type</div>
          </div>

          <div className="divide-y divide-border">
            {sortedItems.length === 0 ? (
              <div className="px-4 py-12 text-center text-muted-foreground">
                This folder is empty
              </div>
            ) : (
              sortedItems.map((item) => (
                <DriveListItem
                  key={item.id}
                  item={item}
                  onFolderClick={handleFolderClick}
                />
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
  onFolderClick: (item: DriveItem) => void
}

function DriveListItem({ item, onFolderClick }: DriveListItemProps) {
  const isFolder = item.type === "folder"

  const content = (
    <div
      className={`grid grid-cols-12 gap-4 px-4 py-3 text-sm transition-colors hover:bg-accent ${
        isFolder ? "cursor-pointer" : ""
      }`}
      onClick={isFolder ? () => onFolderClick(item) : undefined}
    >
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
      <div className="col-span-2 flex items-center capitalize text-muted-foreground">
        {item.type}
      </div>
    </div>
  )

  if (isFolder) {
    return content
  }

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  )
}
