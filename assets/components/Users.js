import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';


class Users extends Component {
    constructor() {
        super();
        this.state = { users:[]};
        this.state = { loading: true};
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get(`/api/users`).then(users => {
            this.setState({ users: users.data})
            this.setState({ loading: false})
        })
    }

    render() {
        console.log(this.state.users);
        const loading = this.state.loading;
        return(
            <div>
                <section className="row-section">
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center"><span>List of users</span></h2>
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
                                        <th> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map( (user, id) =>(
                                        <tr key={id}>
                                            <td>{user.nom}</td>
                                            <td>{user.prenom}</td>
                                            <td>{user.email}</td>
                                            <td>{user.adresse}</td>
                                            <td>{user.tel}</td>
                                            <td> </td>
                                        </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}
export default Users;