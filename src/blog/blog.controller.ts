import { Controller,Get,NotFoundException,Res,Param ,Post,Body,Query,Put,Delete, HttpStatus} from '@nestjs/common';
import {BlogService} from './blog.service';
import { identity } from 'rxjs';


@Controller('blog')
export class BlogController {

    constructor(private blogservice:BlogService) {}

    @Get("posts")
     getPosts() {
        return this.blogservice.getPosts();
        // return res.status(HttpStatus.OK).json(posts);
    }

    @Get("post/:id")
    async getPost(@Res() res,@Param('id') id){
        const post = await this.blogservice.getPost(id);
        if(!post){
            throw new NotFoundException("Post doesnot exist");
        }
        return res.status(HttpStatus.OK).json(post);
    }

    @Post("/post")
    async addPost(@Res() res,@Body() data){

        const newpost = await this.blogservice.addPost(data);
        console.log("new",newpost)
        return res.status(HttpStatus.OK).json({
            message: "Post has been successful",
            post:newpost
        });
    }

    @Put('/edit/:id')
    async editPost(@Res() res,@Param('id') id,@Body() data){
        const post = await this.blogservice.update(id,data);

        if(!post) throw new NotFoundException("Post does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Post has been edited successfully",
            post:post
        });

    }

    @Delete('/delete/:id')
    async deletePost(@Res() res, @Param('id') id){
        const post = await this.blogservice.delete(id);

        if(!post) throw new NotFoundException("Post does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Post has been deleted",
            post:post
        });

    }



}
