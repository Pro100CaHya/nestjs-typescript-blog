import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts: Post[] = [];

    createPost(post: CreatePostDto): Post {
        const newPost = {
            id: ++this.lastPostId,
            ...post
        }

        this.posts.push(newPost);

        return newPost;
    }

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(id: number): Post {
        const post = this.posts.find((post) => post.id === id);

        if (post === undefined) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        
        return post;
    }

    updatePost(id: number, post: UpdatePostDto): Post {
        const index = this.posts.findIndex((post) => post.id === id);

        if (index === -1) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        const updatedPost = {
            ...this.posts[index],
            ...post
        }


        this.posts[index] = updatedPost;

        return updatedPost
    }

    deletePost(id: number): Post {
        const index = this.posts.findIndex((post) => post.id === id);

        if (index === -1) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        const deletedPost = this.posts[index];

        this.posts.splice(index, 1);

        return deletedPost;
    }
}
