export const idbConfig = {
  databaseName: "pilcrow-editor",
  version: 1,
  stores: [
    {
      name: "docs",
      id: { keyPath: "id", autoIncrement: false },
      indices: [
        {
          name: "title",
          keyPath: "title",
          options: {
            unique: false,
          },
        },
        {
          name: "created_at",
          keyPath: "created_at",
          options: {
            unique: false,
          },
        },
        {
          name: "last_updated_at",
          keyPath: "last_updated_at",
          options: {
            unique: false,
          },
        },
        {
          name: "content",
          keyPath: "content",
          options: {
            unique: false,
          },
        },
        {
          name: "notes",
          keyPath: "notes",
          options: {
            unique: false,
          },
        },
      ],
    },
  ],
};
