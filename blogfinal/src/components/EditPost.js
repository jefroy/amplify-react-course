import React, {Component} from "react";
import {listPosts} from "../graphql/queries";
import {API, button, graphqlOperation} from "aws-amplify";

class EditPost extends Component {

    state = {
    }

    componentDidMount = async () => {
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
            <button>Edit</button>
        )
    }
}

const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px',
}

export default EditPost;
