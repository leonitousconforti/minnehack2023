"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResolvers = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_service_1 = require("./posts.service");
const graphql_schema_1 = require("../graphql.schema");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
let PostsResolvers = class PostsResolvers {
    constructor(postService) {
        this.postService = postService;
    }
    async posts() {
        return this.postService.findAll();
    }
    async post(args) {
        return this.postService.findOne(args);
    }
    async create(args) {
        const createdPost = await this.postService.create(args);
        pubSub.publish("postCreated", { postCreated: createdPost });
        return createdPost;
    }
    async update(args) {
        return this.postService.update(args);
    }
    async delete(args) {
        return this.postService.delete(args);
    }
    postCreated() {
        return pubSub.asyncIterator("postCreated");
    }
};
__decorate([
    (0, graphql_1.Query)("posts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsResolvers.prototype, "posts", null);
__decorate([
    (0, graphql_1.Query)("post"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsResolvers.prototype, "post", null);
__decorate([
    (0, graphql_1.Mutation)("createPost"),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.NewPost]),
    __metadata("design:returntype", Promise)
], PostsResolvers.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)("updatePost"),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.UpdatePost]),
    __metadata("design:returntype", Promise)
], PostsResolvers.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)("deletePost"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsResolvers.prototype, "delete", null);
__decorate([
    (0, graphql_1.Subscription)("postCreated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolvers.prototype, "postCreated", null);
PostsResolvers = __decorate([
    (0, graphql_1.Resolver)("Post"),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolvers);
exports.PostsResolvers = PostsResolvers;
//# sourceMappingURL=posts.resolvers.js.map