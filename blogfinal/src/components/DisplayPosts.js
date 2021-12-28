import React, {Component} from "react";
import {listPosts} from "../graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import {onCreatePost} from "../graphql/subscriptions";

class DisplayPosts extends Component {

    state = {
        posts: [],
    }

    componentDidMount = async () => {
        this.getPosts()
        this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
            .subscribe({
                next: postData => {
                    const newPost = postData.value.data.onCreatePost
                    const prevPost = this.state.posts.filter(post => post.id !== newPost.id)
                    const updatedPosts = [newPost, ...prevPost]
                    this.setState({posts: updatedPosts})
                }
            })
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe()
    }

    getPosts = async () => {
        const result = await API.graphql(
            graphqlOperation(listPosts)
        )
        this.setState({posts: result.data.listPosts.items})
        // console.log("all posts: ", JSON.stringify(result.data.listPosts.items))
    }

    render(){
        const { posts } = this.state
        return posts.map((post) => {
            return (
                <div style={rowStyle} className="posts" key={post.id}>
                    <h1>{post.postTitle}</h1>
                    <span style={{fontStyle: "italic", color: '#0ca5e297'}}>
                        {"Written By: "} {post.postOwnerUsername}
                        {" on "}
                        <time style={{fontStyle: "italic"}}>
                            {" "}
                            {new Date(post.createdAt).toDateString()}
                        </time>
                    </span>
                    <p>
                        {post.postBody}
                    </p>
                    <br/>
                    <span>
                        <DeletePost /><EditPost />
                    </span>
                </div>
            )
        })
    }
}

const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px',
}

export default DisplayPosts;
