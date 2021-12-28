import React, {Component} from "react";
import {listPosts} from "../graphql/queries";
import {API, button, graphqlOperation} from "aws-amplify";

class CreatePost extends Component {

    state = {
        postOwnerId: '',
        postOwnerUsername: '',
        postTitle: '',
        postBody: '',
        createdAt: '',
    }

    componentDidMount = async () => {
        // todo tba
    }

    getPosts = async () => {
        const result = await API.graphql(
            graphqlOperation(listPosts)
        )
        this.setState({posts: result.data.listPosts.items})
        // console.log("all posts: ", JSON.stringify(result.data.listPosts.items))
    }

    render(){
        return(
            <form className={'add-post'} action=""
                  onSubmit={this.handleAddPost}
            >
                <input style={{font: '19px'}} type="text" placeholder={'Title'} name={'postTitle'} required/>
                <textarea name={'postBody'} rows={3} cols={40} required placeholder={'New Blog Post'} type="text"/>
                <input type="submit" className={'btn'} style={{fontSize: '19px'}}/>
            </form>
        )
    }

    handleAddPost = async event => {
        event.preventDefault()
        const input = {
            postOwnerId: this.postOwnerId,
            postOwnerUsername: this.postOwnerUsername,
            postTitle: this.postTitle,
            postBody: this.postBody,
            createdAt: new Date().toISOString(),
        }
    }
}

const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px',
}

export default CreatePost;
