-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "receta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receta" ("createdAt", "id", "imagen", "nombre", "updateAt", "usuario_id") SELECT "createdAt", "id", "imagen", "nombre", "updateAt", "usuario_id" FROM "receta";
DROP TABLE "receta";
ALTER TABLE "new_receta" RENAME TO "receta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
