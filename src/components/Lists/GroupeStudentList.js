import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  acceptStudent, LeaveGroupe, joindGroupe, changeGroupeState, deleteGroupe, addGroupe, getGroupeList } from '../../actions/groupeActions'



class GroupeStudentList extends Component {

    isAccepted(id, groupe) {
        if (groupe.acceptedUsers) {
            if (groupe.acceptedUsers.indexOf(id) !== -1)
                return true;
        }
        return false;
    }

   
 
    leaveGroupe(id, id_student) {
        this.props.LeaveGroupe(id, id_student);
    }
    acceptStudent(id_groupe, id_student) {

        this.props.acceptStudent(id_groupe, id_student);
    }

 

    createGroupeList() {
        let listItems = [];
        let groupe = null;
            this.props.groupe.list.map(g => {
            if (g.id === this.props.groupe_id) {
                groupe = g;
                return null;
                
            }
            return null;
        })
        const list = groupe.users.split('/') || [];
        const id_user = this.props.user.user.id;
         console.log("list length"+list.length)
        if (list.length > 0) {
            
            list.map(user => {
                if (user !=="") {
                   
                
                const user_info = user.split(',')
                listItems.push(
                    
                    <tr >
                      
                        <td><a href={"/profile/"+user_info[0]+"/1"}>{user_info[0]}</a></td>
                            <td><a href={"/profile/"+user_info[0]+"/1"}>{user_info[1]}</a></td>
                        {this.isAccepted(user_info[0], groupe) && <td className="text-center text-success">  "Approuved"</td>}
                        {!this.isAccepted(user_info[0], groupe) && <td className="text-center text-warning">  "Not Approuved.."</td>}
                       { groupe.owner+""  === id_user+"" && user_info[0] !== ""+groupe.owner && <td className="text-center">
                            {!this.isAccepted(user_info[0], groupe) && <button onClick={this.acceptStudent.bind(this, groupe.id, user_info[0])} className="btn btn-success btn-sm" > Accept</button>}
                            <button onClick={this.leaveGroupe.bind(this, groupe.id, user_info[0])} className="btn btn-danger btn-sm" > Delete</button>
                        </td>}
                    </tr>
                )
                
                return null
            }})
        }
        return listItems;

    }



    render() {
        const { type } = this.props.user.user;
     
        return (



            <div class="container fadeInDown" >
                <div className="input-groupe btn align-left">
                    <a href={"/profile/"+this.props.user.user.id+"/3"} className="btn bg-primary text-white"> {' << Return'}</a>
                </div>
                <div class="row" >
                    <div class="col-lg-12">

                        <h3 className="text-center"> List of Users </h3>


                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table class="table table-striped w-table-fixed">

                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">name</th>
                                        <th className="text-center">State</th>
                                        {type === 3 && <th className="text-center">Action</th>}
                                    </tr>
                                </thead>
                                <tbody>

                                   { this.createGroupeList()}

                                </tbody>


                            </table>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    groupe: state.groupe,
    user: state.security
});

export default connect(mapStateToProps, {  acceptStudent, LeaveGroupe, joindGroupe, changeGroupeState, deleteGroupe, addGroupe, getGroupeList })(GroupeStudentList);
