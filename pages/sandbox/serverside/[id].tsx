import React from "react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type BlogPost = {
    id: number;
    title: string;
}

type BlogPostProps = {
    post: BlogPost
}

export default function serverSideId({post}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return(
        <>
        <div>
            {post.id}
            {post.title}
        </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.params!.id
    const {data:post} = await axios.get<BlogPost>(
        `https://my-json-server.typicode.com/typicode/demo/posts/${id}`
    )
    return{
        props: { post },
    }
}


export async function getServerSidePaths() {
    const {data:posts} = await axios.get<BlogPost[]>('https://my-json-server.typicode.com/typicode/demo/posts')
    const paths = posts.map(({id}) => ({params: {id: id.toString()}}))
    console.log(paths)
    return{
         paths,
         fallback: false

    }
}

