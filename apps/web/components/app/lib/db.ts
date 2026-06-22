// Surcharge web : la couche données de l'app pointe sur l'implémentation
// IndexedDB (Dexie), qui expose les MÊMES signatures que le db.ts SQLite du
// desktop. Les pages/store réutilisés n'ont rien à changer.
export * from "@/lib/idb";
