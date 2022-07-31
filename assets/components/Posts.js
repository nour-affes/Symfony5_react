// ./assets/js/components/Posts.js

import React, {Component} from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";


class Posts extends Component {
    constructor() {
        super();

        this.state = {posts: [], loading: true}
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get(`https://jsonplaceholder.typicode.com/posts/`).then(res => {
            const posts = res.data.slice(0, 15);
            this.setState({posts, loading: false})
        })
    }

    render() {
        const loading = this.state.loading;
        return (
            <div>
                <section className="row-section">
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center"><span>List of posts</span>Created with <i
                                className="fa fa-heart"></i> by yemiwebby </h2>
                        </div>

                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>

                        ) : (
                            <div className={'row'}>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                    <tr>
                                        {/*<th>#</th>*/}
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Adresse</th>
                                        <th>tel</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map((user, id) => (
                                        <tr key={id}>
                                            <td>{user.nom}</td>
                                            <td>{user.prenom}</td>
                                            <td>{user.email}</td>
                                            <td>{user.adresse}</td>
                                            <td>{user.tel}</td>
                                            <td>

                                                <button style={{color: 'red'}}
                                                        onClick={() => this.removeUser(user.id)
                                                        }
                                                >X
                                                </button>

                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </Table>
                            </div>
                            // <div className={'row'}>
                            //     {this.state.posts.map(post =>
                            //         <div className="col-md-10 offset-md-1 row-block" key={post.id}>
                            //             <ul id="sortable">
                            //                 <li>
                            //                     <div className="media">
                            //                         <div className="media-body">
                            //                             <h4>{post.title}</h4>
                            //                             <p>{post.body}</p>
                            //                         </div>
                            //                     </div>
                            //                 </li>
                            //             </ul>
                            //         </div>
                            //     )}
                            // </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default Posts;