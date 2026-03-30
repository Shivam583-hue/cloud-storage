import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    type: text("type", { enum: ["document", "image", "video", "other"] }).notNull(),
    size: int("size").notNull(),               // bytes
    url: text("url").notNull(),
    mimeType: text("mime_type"),
    parent: bigint("parent", { mode: "number", unsigned: true }),  // null = root
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("files_parent_index").on(t.parent),
    index("files_owner_id_index").on(t.ownerId),
  ],
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),  // null = root
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("folders_parent_index").on(t.parent),
    index("folders_owner_id_index").on(t.ownerId),
  ],
);

export type DB_FolderType = typeof folders_table.$inferSelect;
