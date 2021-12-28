import React, {Component} from "react";
import {listPosts} from "../graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import {createPost} from "../graphql/mutations";

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

    render(){
        return(
            <form className={'add-post'}
                  action=""
                  onSubmit={this.handleAddPost}
            >
                <input placeholder={'Title'} name={'postTitle'}
                       style={{font: '19px'}}
                       type="text"
                       required
                       value={this.state.postTitle}
                       onChange={this.handleChangePost}
                />
                <textarea placeholder={'New Blog Post'} name={'postBody'}
                          rows={3}
                          cols={40}
                          required
                          value={this.state.postBody}
                          onChange={this.handleChangePost}
                />
                <input type="submit" className={'btn'} style={{fontSize: '19px'}}/>
            </form>
        )
    }

    handleChangePost = event => this.setState({
        [event.target.name] : event.target.value
    })
    handleAddPost = async event => {
        event.preventDefault()
        const input = {
            postOwnerId: 'testman123', // this.state.postOwnerId,
            postOwnerUsername: 'testman', // this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
            createdAt: new Date().toISOString(),
        }
        await API.graphql(graphqlOperation(createPost, {input}))
        this.setState({postTitle: '', postBody: ''})
    }
}

const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px',
}

export default CreatePost;
