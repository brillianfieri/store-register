import React from "react";
import axios from "axios";
import { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";

type BlogPost = {
    id: number;
    title: string;
}

type BlogPostProps = {
    post: BlogPost
}

export default function inventoryDetail({post}: InferGetStaticPropsType<typeof getStaticProps>) {

    return(
        <>
        <div>
            {post.id}
            {post.title}
        </div>
        </>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const id = context.params!.id
    const {data:post} = await axios.get<BlogPost>(
        `https://my-json-server.typicode.com/typicode/demo/posts/${id}`
    )
    return{
        props: { post },
    }
}


export async function getStaticPaths() {
    const {data:posts} = await axios.get<BlogPost[]>('https://my-json-server.typicode.com/typicode/demo/posts')
    const paths = posts.map(({id}) => ({params: {id: id.toString()}}))
    console.log(paths)
    return{
         paths,
         fallback: false

    }
}

