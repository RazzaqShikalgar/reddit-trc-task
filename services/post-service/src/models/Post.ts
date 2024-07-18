import { defineModel, DataTypes } from 'drizzle-orm';

export const Post = defineModel({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.UUID,
    references: 'users(id)',
  },
});
