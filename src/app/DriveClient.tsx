"use client"

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
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
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  breadcrumbs: BreadcrumbItem[]  // built and passed in by the server component
}

export default function DriveClient({ items, breadcrumbs }: DriveClientProps) {
  const router = useRouter()

  const sortedItems = [...items].sort((a, b) => {
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
            {/*   <Button className="gap-2"> */}
            {/*     <Upload className="h-4 w-4" /> */}
            {/*     Upload */}
            {/*   </Button> */}
            <div>
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
      </header >

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-1 text-sm">
            <li className="flex items-center gap-1">
              <Link
                href="/f"
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

        {/* File List */}
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
                <DriveListItem key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </main>
    </div >
  )
}

interface DriveListItemProps {
  item: DriveItem
}

function DriveListItem({ item }: DriveListItemProps) {
  const isFolder = item.type === "folder"

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
      <div className="col-span-2 flex items-center capitalize text-muted-foreground">
        {item.type}
      </div>
    </div>
  )

  if (isFolder) {
    return (
      <Link href={`/f/${item.id}`} className="block">
        {content}
      </Link>
    )
  }

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  )
}
