import React from "react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type UserType = {
    id: number;
    username: string;
}

// type Props = {
//     post: UserType
// }

export default function ServerSideIndex({user}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return(
        <>
        <div>
            {user.username}
        </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const id = context.params!.id
    // const {data:post} = await axios.get<BlogPost>(
    //     `https://my-json-server.typicode.com/typicode/demo/posts/${id}`
    // )
    return{
        props: { 
            user: {
                id: 1,
                username: 'testusername'
            }
         },
    }
}


// export async function getServerSidePaths() {
//     const {data:posts} = await axios.get<BlogPost[]>('https://my-json-server.typicode.com/typicode/demo/posts')
//     const paths = posts.map(({id}) => ({params: {id: id.toString()}}))
//     console.log(paths)
//     return{
//          paths,
//          fallback: false

//     }
// }

