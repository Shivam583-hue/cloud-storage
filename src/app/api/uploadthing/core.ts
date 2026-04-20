import { db } from "@/server/db";
import { MUTATIONS } from "@/server/db/queries";
import { folders_table } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  driveUploader: f({
    blob: {
      maxFileSize: "1GB",
      maxFileCount: 99,
    },
  }).input(z.object({
    folderId: z.string(),
  }))
    .middleware(async ({ input }) => {
      try {
        const user = await auth()
        console.log("1. auth:", user.userId)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (!user.userId) throw new UploadThingError("Unauthorized")

        console.log("2. input:", input)

        const folder = await db
          .select()
          .from(folders_table)
          .where(eq(folders_table.id, Number(input.folderId)))

        console.log("3. folder:", folder)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (!folder[0]) throw new UploadThingError("Folder not found")


        if (folder[0].ownerId !== user.userId) {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw new UploadThingError("Unauthorized")
        }

        return { userId: user.userId, folderId: Number(input.folderId) }
      } catch (err) {
        console.error("middleware error:", err)
        throw err
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      try {
        await MUTATIONS.createFile({
          file: {
            name: file.name,
            size: file.size,
            type: toFileType(file.type),
            url: file.ufsUrl,
            parent: metadata.folderId,
          },
          userId: metadata.userId
        })
      } catch (err) {
        console.error("MUTATIONS.createFile failed:", err)
        throw err
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

function toFileType(mimeType: string): "document" | "image" | "video" | "other" {
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (
    mimeType === "application/pdf" ||
    mimeType === "application/msword" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "text/plain"
  ) return "document"
  return "other"
}
