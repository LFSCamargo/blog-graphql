import { ResolverType, GraphQLContext, ConnectionArgs } from "@types";
import { globalIdField } from "graphql-relay";
import blogModel, { Blog } from "./model";
import { Constants, connectionFromMongoCursor } from "~/utils";

export default {
  Post: {
    id: globalIdField("Post"),
  },
  Mutation: {
    // Creates a new Post for a user
    createPost: async (
      _: any,
      { title, description, body, topic, image }: Blog,
      { user }: GraphQLContext
    ) => {
      if (!user) {
        throw new Error(Constants.errors.notLogged);
      }

      if (user.role === "USER") {
        throw new Error(Constants.errors.unauthorized);
      }

      const post = new blogModel({
        image,
        topic,
        title,
        description,
        body,
        user: user._id.toString(),
      });

      await post.save();

      return {
        message: Constants.success.postCreated,
        post: await blogModel.findOne({ _id: post._id }),
      };
    },
    // Edits a existing post for a user
    editPost: async (
      _: any,
      { _id, title, description, body, topic, image }: Blog,
      { user }: GraphQLContext
    ) => {
      if (!user) {
        throw new Error(Constants.errors.notLogged);
      }

      const post = await blogModel.findOne({ _id });

      if (!post) {
        throw new Error(Constants.errors.notFound);
      }

      if (post.user !== user._id.toString()) {
        throw new Error(Constants.errors.unauthorized);
      }

      await post.update({
        topic,
        image,
        title,
        description,
        body,
      });

      await post.save();

      return {
        message: Constants.success.postUpdated,
        post: await blogModel.findOne({ _id: post._id }),
      };
    },
    // Delete a existing post for a user
    deletePost: async (_: any, { _id }: Blog, { user }: GraphQLContext) => {
      if (!user) {
        throw new Error(Constants.errors.notLogged);
      }

      const post = await blogModel.findOne({ _id });

      if (!post) {
        throw new Error(Constants.errors.notFound);
      }

      if (post.user !== user._id.toString()) {
        throw new Error(Constants.errors.unauthorized);
      }

      await post.update({
        active: false,
      });

      await post.save();

      return {
        message: Constants.success.postDeleted,
        post: await blogModel.findOne({ _id: post._id }),
      };
    },
  },
  Query: {
    post: async (_: any, { _id }: Blog) => {
      return blogModel.findOne({ _id });
    },
    posts: async (_: any, args: ConnectionArgs, context: GraphQLContext) => {
      const where = args.search
        ? { title: { $regex: new RegExp(`^${args.search}`, "ig") } }
        : {};
      const users = blogModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

      return connectionFromMongoCursor({
        cursor: users,
        context,
        args,
        loader: async (_: GraphQLContext, id: any): Promise<Blog | null> => {
          if (!id && typeof id !== "string") {
            return null;
          }
          return await blogModel.findOne({ _id: id });
        },
      });
    },
  },
} as ResolverType;
